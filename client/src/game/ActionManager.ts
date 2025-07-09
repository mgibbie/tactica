import * as THREE from 'three';
import { Unit } from '../units/Unit';
import hoverSelectImageUrl from '../assets/Images/hoverselect.png';
import { Skill } from '../units/Skill';
import { SCENE_GLOBAL } from '../game';
import { UnitTracker } from './UnitTracker';

export interface AttackData {
    validTiles: { x: number; y: number }[];
    paths: Map<string, { x: number; y: number }[]>;
}

let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForAction(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class ActionManager {
    private textureLoader = new THREE.TextureLoader();
    private hoverSelectTexture: THREE.Texture | null = null;
    private attackIndicators: THREE.Mesh[] = [];
    private skillTargetIndicators: THREE.Mesh[] = [];
    private skillPreviewIndicators: THREE.Mesh[] = [];
    private selectedAttackTarget: { x: number; y: number } | null = null;
    private currentAttackData: AttackData | null = null;
    private validSkillTargets: { x: number; y: number }[] = [];
    private selectedSkillTarget: { x: number; y: number } | null = null;
    private skillRotation: number = 0; // For rotational skills
    private attackMode: 'basic' | 'skill' = 'basic';
    private currentSkill: Skill | null = null;
    private targetUnit: Unit | null = null;

    constructor() {
        this.loadHoverSelectTexture();
    }

    private async loadHoverSelectTexture(): Promise<void> {
        this.hoverSelectTexture = await this.textureLoader.loadAsync(hoverSelectImageUrl);
        this.hoverSelectTexture.magFilter = THREE.NearestFilter;
        this.hoverSelectTexture.minFilter = THREE.NearestFilter;
    }

    public enterActionPhase(unit: Unit, getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined, getUnitPositions: () => Map<Unit, { x: number; y: number }>): void {
        console.log(`⚔️ Entering ACTION phase for ${unit.name}`);
        
        // Clear any existing attack indicators
        this.clearAttackIndicators();
        this.selectedAttackTarget = null;
        this.currentAttackData = null;
        this.targetUnit = null;
        this.attackMode = 'basic';
        this.currentSkill = null;
    }

    public exitActionPhase(): void {
        console.log('🚪 Exiting ACTION phase');
        this.clearAttackIndicators();
        this.clearSkillTargetIndicators();
        this.clearSkillPreviewIndicators();
        this.selectedAttackTarget = null;
        this.selectedSkillTarget = null;
        this.currentAttackData = null;
        this.validSkillTargets = [];
        this.skillRotation = 0;
        this.targetUnit = null;
        this.attackMode = 'basic';
        this.currentSkill = null;
    }

    public setAttackMode(mode: 'basic' | 'skill', skill: Skill | null): void {
        this.attackMode = mode;
        this.currentSkill = skill;
        console.log(`🎯 Attack mode set to: ${mode}${skill ? ` (${skill.name})` : ''}`);
    }

    public setAttackData(attackData: AttackData): void {
        this.currentAttackData = attackData;
        console.log(`📋 Attack data set with ${attackData.validTiles.length} valid targets`);
    }

    public createAttackIndicators(): void {
        console.log('🎯 Creating attack indicators');
        
        // Clear existing indicators first
        this.clearAttackIndicators();
        
        if (!this.currentAttackData || !this.hoverSelectTexture || !SCENE_GLOBAL) {
            console.warn("❌ Cannot create attack indicators - missing data, texture, or scene");
            return;
        }

        this.currentAttackData.validTiles.forEach(tile => {
            const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
            const material = new THREE.MeshBasicMaterial({
                map: this.hoverSelectTexture,
                transparent: true,
                opacity: 0.7,
                color: 0xff0000 // Red tint for attack indicators
            });

            const indicatorMesh = new THREE.Mesh(geometry, material);
            
            // Position the indicator at the tile
            indicatorMesh.position.set(
                tile.x * TILE_WIDTH + TILE_WIDTH / 2,
                -tile.y * TILE_HEIGHT - TILE_HEIGHT / 2,
                0.4 // Slightly above ground but below units
            );

            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.add(indicatorMesh);
                this.attackIndicators.push(indicatorMesh);
            }
        });
        
        console.log(`✅ Created ${this.currentAttackData.validTiles.length} attack indicators`);
    }

    private clearAttackIndicators(): void {
        this.attackIndicators.forEach(mesh => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
            }
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
                mesh.material.dispose();
            }
        });
        this.attackIndicators = [];
        console.log("🧹 Cleared attack indicators");
    }

    private clearSkillTargetIndicators(): void {
        this.skillTargetIndicators.forEach(mesh => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
            }
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
                mesh.material.dispose();
            }
        });
        this.skillTargetIndicators = [];
        console.log("🧹 Cleared skill target indicators");
    }

    private clearSkillPreviewIndicators(): void {
        this.skillPreviewIndicators.forEach(mesh => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
            }
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
                mesh.material.dispose();
            }
        });
        this.skillPreviewIndicators = [];
        console.log("🧹 Cleared skill preview indicators");
    }

    public setSkillTarget(skill: Skill, targetPosition: { x: number, y: number }): void {
        console.log(`🎯 Setting skill target for ${skill.name} at (${targetPosition.x}, ${targetPosition.y})`);
        this.currentSkill = skill;
        this.selectedSkillTarget = targetPosition;
        this.skillRotation = 0; // Reset rotation
    }

    public showSkillPreview(x: number, y: number): void {
        console.log(`👁️ Showing skill preview at (${x}, ${y})`);
        
        // Clear existing preview indicators
        this.clearSkillPreviewIndicators();
        
        if (!this.currentSkill || !this.hoverSelectTexture || !SCENE_GLOBAL) {
            console.warn("❌ Cannot show skill preview - missing skill, texture, or scene");
            return;
        }
        
        // Get the skill's target pattern
        const targetPattern = this.currentSkill.getTargetPattern(x, y, 'north', this.skillRotation);
        
        // Create preview indicators for each target in the pattern
        targetPattern.forEach(target => {
            // Check if target is within map bounds
            if (target.x >= 0 && target.x < 8 && target.y >= 0 && target.y < 8) {
                const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
                const material = new THREE.MeshBasicMaterial({
                    map: this.hoverSelectTexture,
                    transparent: true,
                    opacity: 0.6,
                    color: target.isPrimary ? 0xff8800 : 0xffff00 // Orange for primary, yellow for secondary
                });

                const indicatorMesh = new THREE.Mesh(geometry, material);
                
                // Position the indicator at the target tile
                indicatorMesh.position.set(
                    target.x * TILE_WIDTH + TILE_WIDTH / 2,
                    -target.y * TILE_HEIGHT - TILE_HEIGHT / 2,
                    0.5 // Above attack indicators
                );

                if (SCENE_GLOBAL) {
                    SCENE_GLOBAL.add(indicatorMesh);
                    this.skillPreviewIndicators.push(indicatorMesh);
                }
            }
        });
        
        console.log(`✅ Created ${targetPattern.length} skill preview indicators`);
    }

    public setSkillTargeting(skill: Skill, validTargets: {x:number, y:number}[]): void {
        console.log(`🎯 Setting skill targeting for ${skill.name} with ${validTargets.length} targets`);
        this.currentSkill = skill;
        this.validSkillTargets = validTargets;
        this.selectedSkillTarget = null;
        this.skillRotation = 0; // Reset rotation
    }

    public createSkillTargetIndicators(): void {
        console.log('✨ Creating skill target indicators');
        
        // Clear existing indicators first
        this.clearSkillTargetIndicators();
        
        if (!this.validSkillTargets.length || !this.hoverSelectTexture || !SCENE_GLOBAL) {
            console.warn("❌ Cannot create skill target indicators - missing data, texture, or scene");
            return;
        }

        this.validSkillTargets.forEach(target => {
            const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
            const material = new THREE.MeshBasicMaterial({
                map: this.hoverSelectTexture,
                transparent: true,
                opacity: 0.7,
                color: 0x00ff00 // Green for skill targets
            });

            const indicatorMesh = new THREE.Mesh(geometry, material);
            
            // Position the indicator at the tile
            indicatorMesh.position.set(
                target.x * TILE_WIDTH + TILE_WIDTH / 2,
                -target.y * TILE_HEIGHT - TILE_HEIGHT / 2,
                0.4 // Same level as attack indicators
            );

            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.add(indicatorMesh);
                this.skillTargetIndicators.push(indicatorMesh);
            }
        });
        
        console.log(`✅ Created ${this.validSkillTargets.length} skill target indicators`);
    }

    public selectAttackTarget(x: number, y: number, getUnitAtPosition: (x: number, y: number) => Unit | null, selectedUnit: Unit): { success: boolean; targetUnit: Unit | null } {
        console.log(`🎯 Attempting to select attack target at (${x}, ${y})`);
        console.log(`📋 Debug - currentAttackData exists:`, !!this.currentAttackData);
        console.log(`📋 Debug - validSkillTargets exists:`, !!this.validSkillTargets.length);
        console.log(`📋 Debug - attackMode:`, this.attackMode);
        
        // For skills, check validSkillTargets; for basic attacks, check currentAttackData
        if (this.attackMode === 'skill') {
            if (!this.validSkillTargets.length && !this.currentAttackData) {
                console.warn("❌ No skill targets or attack data available");
                return { success: false, targetUnit: null };
            }
        } else {
            if (!this.currentAttackData) {
                console.warn("❌ No attack data available");
                return { success: false, targetUnit: null };
            }
        }
        
        // Check if the target position is valid based on attack mode
        let isValidTarget = false;
        
        if (this.attackMode === 'skill' && this.validSkillTargets.length > 0) {
            // For skills using validSkillTargets (dual-rotational, etc.)
            isValidTarget = this.validSkillTargets.some(tile => 
                tile.x === x && tile.y === y
            );
            console.log(`📋 Debug - isValidSkillTarget:`, isValidTarget);
            console.log(`📋 Debug - validSkillTargets:`, this.validSkillTargets);
        } else if (this.currentAttackData) {
            // For basic attacks and adjacent-attack skills using currentAttackData
            isValidTarget = this.currentAttackData.validTiles.some(tile => 
                tile.x === x && tile.y === y
            );
            console.log(`📋 Debug - isValidAttackTarget:`, isValidTarget);
            console.log(`📋 Debug - validTiles:`, this.currentAttackData.validTiles);
        }
        
        if (!isValidTarget) {
            console.log(`❌ Invalid target: (${x}, ${y}) - not in valid targets`);
            return { success: false, targetUnit: null };
        }
        
        // For basic attacks, we need a unit at the target position
        if (this.attackMode === 'basic') {
            const targetUnit = getUnitAtPosition(x, y);
            console.log(`📋 Debug - targetUnit at position:`, targetUnit ? `${targetUnit.name} (${targetUnit.team})` : 'null');
            
            if (!targetUnit) {
                console.log(`❌ No unit found at attack target (${x}, ${y})`);
                return { success: false, targetUnit: null };
            }
            
            // Check if target is an enemy (can't attack same team)
            if (targetUnit.team === selectedUnit.team) {
                console.log(`❌ Cannot attack unit of same team: ${targetUnit.name}`);
                return { success: false, targetUnit: null };
            }
            
            this.selectedAttackTarget = { x, y };
            this.targetUnit = targetUnit;
            console.log(`✅ Selected valid attack target: ${targetUnit.name} at (${x}, ${y})`);
            console.log(`📋 Debug - After setting: selectedAttackTarget:`, this.selectedAttackTarget);
            console.log(`📋 Debug - After setting: targetUnit:`, this.targetUnit ? `${this.targetUnit.name}` : 'null');
            return { success: true, targetUnit };
        }
        
        // For skills, handle different targeting types
        if (this.currentSkill) {
            // Check if the target is in the valid skill targets
            const isValidSkillTarget = this.validSkillTargets.some(target => 
                target.x === x && target.y === y
            );
            
            if (!isValidSkillTarget) {
                console.log(`❌ Invalid skill target: (${x}, ${y}) - not in valid skill targets`);
                return { success: false, targetUnit: null };
            }
            
            this.selectedSkillTarget = { x, y };
            const targetUnit = getUnitAtPosition(x, y);
            this.targetUnit = targetUnit;
            console.log(`✅ Selected skill target at (${x}, ${y})${targetUnit ? ` with unit ${targetUnit.name}` : ' (empty tile)'}`);
            return { success: true, targetUnit };
        }
        
        // Fallback for skills without specific targeting
        this.selectedAttackTarget = { x, y };
        const targetUnit = getUnitAtPosition(x, y);
        this.targetUnit = targetUnit;
        console.log(`✅ Selected skill target at (${x}, ${y})${targetUnit ? ` with unit ${targetUnit.name}` : ' (empty tile)'}`);
        return { success: true, targetUnit };
    }

    public getCurrentAttackMode(): 'basic' | 'skill' {
        return this.attackMode;
    }

    public getCurrentSkill(): Skill | null {
        return this.currentSkill;
    }
    
    public getSelectedSkillTarget(): { x: number; y: number } | null {
        return this.selectedSkillTarget;
    }

    public confirmAttack(selectedUnit: Unit): { success: boolean, damage: number, target: Unit } | null {
        console.log(`⚔️ Confirming attack from ${selectedUnit.name}`);
        console.log(`📋 Debug - selectedAttackTarget:`, this.selectedAttackTarget);
        console.log(`📋 Debug - targetUnit:`, this.targetUnit ? `${this.targetUnit.name} (${this.targetUnit.team})` : 'null');
        console.log(`📋 Debug - attackMode:`, this.attackMode);
        console.log(`📋 Debug - currentAttackData:`, this.currentAttackData);
        
        if (!this.selectedAttackTarget || !this.targetUnit) {
            console.warn("❌ No attack target selected");
            console.warn("❌ Missing data:", { 
                hasTarget: !!this.selectedAttackTarget, 
                hasUnit: !!this.targetUnit 
            });
            return null;
        }
        
        if (this.attackMode === 'basic') {
            // Calculate basic attack damage
            const damage = selectedUnit.basicDamage;
            console.log(`💥 Calculating damage: ${damage} (from ${selectedUnit.name}.basicDamage)`);
            
            // Apply damage to target
            const oldHealth = this.targetUnit.currentHealth;
            this.targetUnit.currentHealth = Math.max(0, this.targetUnit.currentHealth - damage);
            const newHealth = this.targetUnit.currentHealth;
            
            // Handle energy changes for basic attacks
            const oldEnergy = selectedUnit.currentEnergy;
            
            if (selectedUnit.energyType.toLowerCase() === 'kinetic') {
                // Kinetic units GAIN 5 energy from basic attacks (no cost)
                const energyGain = 5;
                selectedUnit.currentEnergy = Math.min(selectedUnit.maxEnergy, selectedUnit.currentEnergy + energyGain);
                console.log(`⚡ Kinetic unit ${selectedUnit.name} gains ${energyGain} energy from attack: ${oldEnergy} → ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);
            } else {
                // Potential units consume 1 energy for basic attacks
                const energyCost = 1;
                selectedUnit.currentEnergy = Math.max(0, selectedUnit.currentEnergy - energyCost);
                console.log(`⚡ Potential unit ${selectedUnit.name} consumes ${energyCost} energy: ${oldEnergy} → ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);
            }
            
            console.log(`💥 ${selectedUnit.name} attacks ${this.targetUnit.name} for ${damage} damage`);
            console.log(`🩸 ${this.targetUnit.name} health: ${oldHealth} → ${newHealth}/${this.targetUnit.health}`);
            
            return { success: true, damage, target: this.targetUnit };
        }
        
        console.warn("❌ Skill attacks not yet implemented");
        return null;
    }

    public cancelAttack(): void {
        console.log('❌ Cancelling attack');
        this.selectedAttackTarget = null;
        this.targetUnit = null;
    }

    public rotateSkillTargets(): void {
        console.log('🔄 Rotating skill targets');
        
        if (!this.currentSkill || !this.selectedSkillTarget) {
            console.warn('❌ No skill or target selected for rotation');
            return;
        }
        
        // Increment rotation (0, 1, 2, 3 for 0°, 90°, 180°, 270°)
        this.skillRotation = (this.skillRotation + 1) % 4;
        console.log(`🔄 Rotated to step ${this.skillRotation}`);
        
        // Update the skill preview with new rotation
        this.showSkillPreview(this.selectedSkillTarget.x, this.selectedSkillTarget.y);
    }

    public checkGameEndConditions(): 'victory' | 'defeat' | 'continue' {
        return UnitTracker.checkGameEndConditions();
    }

    public confirmSkill(selectedUnit: Unit, getUnitAtPosition: (x: number, y: number) => Unit | null): { success: boolean; affectedUnits: Unit[]; skill: Skill; } | null {
        console.log('✨ Confirming skill attack');
        
        if (!this.currentSkill) {
            console.warn('❌ No skill selected');
            return null;
        }
        
        // For skills that target the caster position (like Blazing Knuckle)
        let targetPosition = this.selectedSkillTarget;
        if (!targetPosition) {
            // Use caster position for self-centered skills
            console.warn('❌ No skill target selected - this should not happen');
            return null;
        }
        
        console.log(`✨ Executing skill: ${this.currentSkill.name} at (${targetPosition.x}, ${targetPosition.y})`);
        
        // Check energy cost
        if (selectedUnit.currentEnergy < this.currentSkill.energyCost) {
            console.warn(`❌ Not enough energy for ${this.currentSkill.name}. Required: ${this.currentSkill.energyCost}, Current: ${selectedUnit.currentEnergy}`);
            return null;
        }
        
        // Consume energy
        const oldEnergy = selectedUnit.currentEnergy;
        selectedUnit.currentEnergy = Math.max(0, selectedUnit.currentEnergy - this.currentSkill.energyCost);
        console.log(`⚡ ${selectedUnit.name} energy: ${oldEnergy} → ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);
        
        // Get the skill's target pattern with current rotation
        const targetPattern = this.currentSkill.getTargetPattern(
            targetPosition.x, 
            targetPosition.y, 
            'north', 
            this.skillRotation
        );
        
        console.log(`🎯 Skill pattern has ${targetPattern.length} targets:`, targetPattern);
        
        // Find all units affected by the skill
        const affectedUnits: Unit[] = [];
        targetPattern.forEach(target => {
            // Check if target is within map bounds
            if (target.x >= 0 && target.x < 8 && target.y >= 0 && target.y < 8) {
                const unitAtPosition = getUnitAtPosition(target.x, target.y);
                if (unitAtPosition) {
                    affectedUnits.push(unitAtPosition);
                    console.log(`🎯 Unit found at (${target.x}, ${target.y}): ${unitAtPosition.name} (${unitAtPosition.team})`);
                }
            }
        });
        
        console.log(`💥 Skill will affect ${affectedUnits.length} units`);
        
        // Apply skill effects to affected units
        const totalSkillDamage = selectedUnit.skillDamage + (this.currentSkill.bonusDamage || 0);
        
        // Special handling for self-targeting skills like Bandage
        if (this.currentSkill?.id === 'bandage') {
            // Bandage heals the caster for (Skill Damage + 1)
            const healAmount = totalSkillDamage; // totalSkillDamage already includes the +1 from bonusDamage
            const oldHealth = selectedUnit.currentHealth;
            selectedUnit.currentHealth = Math.min(selectedUnit.health, selectedUnit.currentHealth + healAmount);
            const newHealth = selectedUnit.currentHealth;
            console.log(`🩹 ${selectedUnit.name} bandaged themselves for ${healAmount} healing: ${oldHealth} → ${newHealth}/${selectedUnit.health}`);
            
            // For bandage, we don't need to process the affected units since it only affects the caster
            console.log(`✅ Skill ${this.currentSkill.name} executed successfully, healed caster`);
            
            return {
                success: true,
                affectedUnits: [selectedUnit], // Return the caster as the affected unit
                skill: this.currentSkill
            };
        }

        affectedUnits.forEach(unit => {
            if (this.currentSkill?.id === 'universal-whisper') {
                // Healing skill - only heal friendly units
                if (unit.team === selectedUnit.team) {
                    const healAmount = totalSkillDamage; // Use same calculation but for healing
                    const oldHealth = unit.currentHealth;
                    unit.currentHealth = Math.min(unit.health, unit.currentHealth + healAmount);
                    const newHealth = unit.currentHealth;
                    console.log(`💚 ${unit.name} healed for ${healAmount}: ${oldHealth} → ${newHealth}/${unit.health}`);
                }
            } else {
                // Damage skill - only damage enemy units
                if (unit.team !== selectedUnit.team) {
                    const oldHealth = unit.currentHealth;
                    unit.currentHealth = Math.max(0, unit.currentHealth - totalSkillDamage);
                    const newHealth = unit.currentHealth;
                    console.log(`💥 ${unit.name} takes ${totalSkillDamage} damage: ${oldHealth} → ${newHealth}/${unit.health}`);
                }
            }
        });
        
        // For healing skills, only return units that were actually healed
        // For damage skills, only return units that were actually damaged
        const actuallyAffectedUnits = affectedUnits.filter(unit => {
            if (this.currentSkill?.id === 'universal-whisper') {
                return unit.team === selectedUnit.team; // Only teammates for healing
            } else {
                return unit.team !== selectedUnit.team; // Only enemies for damage
            }
        });
        
        console.log(`✅ Skill ${this.currentSkill.name} executed successfully, affected ${actuallyAffectedUnits.length} units`);
        
        return {
            success: true,
            affectedUnits: actuallyAffectedUnits,
            skill: this.currentSkill
        };
    }
} 