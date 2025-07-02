import * as THREE from 'three';
import { Unit } from '../units/Unit';
import hoverSelectImageUrl from '../assets/Images/hoverselect.png';
import { Skill } from '../units/Skill';
import { SCENE_GLOBAL } from '../game';

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
    private selectedAttackTarget: { x: number; y: number } | null = null;
    private currentAttackData: AttackData | null = null;
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
        this.selectedAttackTarget = null;
        this.currentAttackData = null;
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

    public setSkillTarget(skill: Skill, currentPosition: { x: number, y: number }): void {
        console.log(`🎯 Setting skill target for ${skill.name}`);
        // Implementation for skill targeting if needed
    }

    public showSkillPreview(x: number, y: number): void {
        console.log(`👁️ Showing skill preview at (${x}, ${y})`);
        // Implementation for skill preview if needed
    }

    public setSkillTargeting(skill: Skill, validTargets: {x:number, y:number}[]): void {
        console.log(`🎯 Setting skill targeting for ${skill.name} with ${validTargets.length} targets`);
        // Implementation for skill targeting if needed
    }

    public createSkillTargetIndicators(): void {
        console.log('✨ Creating skill target indicators');
        // Implementation for skill indicators if needed
    }

    public selectAttackTarget(x: number, y: number, getUnitAtPosition: (x: number, y: number) => Unit | null, selectedUnit: Unit): { success: boolean; targetUnit: Unit | null } {
        console.log(`🎯 Attempting to select attack target at (${x}, ${y})`);
        console.log(`📋 Debug - currentAttackData exists:`, !!this.currentAttackData);
        console.log(`📋 Debug - attackMode:`, this.attackMode);
        
        if (!this.currentAttackData) {
            console.warn("❌ No attack data available");
            return { success: false, targetUnit: null };
        }
        
        // Check if the target position is a valid attack tile
        const isValidTarget = this.currentAttackData.validTiles.some(tile => 
            tile.x === x && tile.y === y
        );
        
        console.log(`📋 Debug - isValidTarget:`, isValidTarget);
        console.log(`📋 Debug - validTiles:`, this.currentAttackData.validTiles);
        
        if (!isValidTarget) {
            console.log(`❌ Invalid attack target: (${x}, ${y}) - not in valid attack tiles`);
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
        
        // For skills, we might target empty spaces or units depending on the skill
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
            
            // Consume energy for attack (basic attacks typically cost 1 energy)
            const energyCost = 1;
            const oldEnergy = selectedUnit.currentEnergy;
            selectedUnit.currentEnergy = Math.max(0, selectedUnit.currentEnergy - energyCost);
            const newEnergy = selectedUnit.currentEnergy;
            
            console.log(`💥 ${selectedUnit.name} attacks ${this.targetUnit.name} for ${damage} damage`);
            console.log(`🩸 ${this.targetUnit.name} health: ${oldHealth} → ${newHealth}/${this.targetUnit.health}`);
            console.log(`⚡ ${selectedUnit.name} energy: ${oldEnergy} → ${newEnergy}/${selectedUnit.maxEnergy}`);
            
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
        // Implementation for skill rotation if needed
    }

    public confirmSkill(selectedUnit: Unit, getUnitAtPosition: (x: number, y: number) => Unit | null): { success: boolean; affectedUnits: Unit[]; skill: Skill; } | null {
        console.log('✨ Confirming skill attack');
        // Implementation for skill confirmation if needed
        return null;
    }
} 