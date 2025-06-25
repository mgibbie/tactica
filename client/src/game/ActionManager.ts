import { Unit } from '../units/Unit';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { globalNavigationManager, Position, MovementData } from './NavigationManager';
import * as THREE from 'three';
import { SCENE_GLOBAL } from '../game';
import { Skill } from '../units/Skill';

// Tile size - will be set by GameScene
let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForAction(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class ActionManager {
    private attackIndicators: Map<string, THREE.Mesh> = new Map(); // Key is "x,y"
    private skillTargetIndicators: Map<string, THREE.Mesh> = new Map(); // Key is "x,y"
    private skillPreviewIndicators: Map<string, THREE.Mesh> = new Map(); // Key is "x,y"
    private textureLoader = new THREE.TextureLoader();
    private hoverSelectTexture: THREE.Texture | null = null;
    
    // Action state
    private attackData: MovementData | null = null;
    private selectedAttackTarget: Unit | null = null;
    private currentAttackMode: 'basic' | 'skill' = 'basic';
    private currentSkill: Skill | null = null;
    
    // Skill targeting state
    private skillTargets: Position[] = [];
    private selectedSkillTarget: Position | null = null;
    private currentRotation: number = 0; // For dual-rotational skills: 0=NE, 1=SE, 2=SW, 3=NW

    constructor() {
        this.loadHoverSelectTexture();
    }

    private async loadHoverSelectTexture(): Promise<void> {
        try {
            const hoverSelectImageUrl = '../assets/Images/hoverselect.png';
            console.log('🎨 Loading hover select texture from:', hoverSelectImageUrl);
            this.hoverSelectTexture = await this.textureLoader.loadAsync(hoverSelectImageUrl);
            this.hoverSelectTexture.magFilter = THREE.NearestFilter;
            this.hoverSelectTexture.minFilter = THREE.NearestFilter;
            this.hoverSelectTexture.flipY = true;
            this.hoverSelectTexture.generateMipmaps = false;
            this.hoverSelectTexture.wrapS = THREE.ClampToEdgeWrapping;
            this.hoverSelectTexture.wrapT = THREE.ClampToEdgeWrapping;
            console.log('✅ Hover select texture loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load hover select texture:', error);
            console.log('🔄 Will use fallback colored indicator');
        }
    }

    public enterActionPhase(unit: Unit, getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined, getUnitPositions: () => Map<Unit, { x: number; y: number }>): void {
        console.log(`⚔️ Entering action phase for unit: ${unit.name}`);
        
        this.selectedAttackTarget = null;
        this.currentAttackMode = 'basic';
        this.currentSkill = null;
        
        // Update navigation manager with current unit positions
        console.log(`📊 Updating occupied tiles for attack targeting`);
        globalNavigationManager.updateOccupiedTiles(getUnitPositions());
        
        // Don't show attack indicators immediately - wait for mode selection
        console.log(`✅ Action phase setup complete - waiting for attack mode selection`);
    }

    public setAttackMode(mode: 'basic' | 'skill', skill?: Skill): void {
        console.log(`🎯 Setting attack mode to: ${mode}${skill ? ` with skill: ${skill.name}` : ''}`);
        
        this.currentAttackMode = mode;
        this.currentSkill = skill || null;
        
        // Clear any existing indicators
        this.clearAttackIndicators();
        
        // Calculate and show appropriate targeting indicators
        // This will be implemented when we add targeting logic
    }

    public setAttackData(attackData: MovementData): void {
        this.attackData = attackData;
    }

    public setSkillTargeting(skill: Skill, targets: Position[]): void {
        console.log(`🎯 Setting skill targeting for ${skill.name} with ${targets.length} targets`);
        this.currentSkill = skill;
        this.skillTargets = targets;
        this.selectedSkillTarget = null;
        
        // Clear any existing skill indicators
        this.clearSkillIndicators();
    }

    public createSkillTargetIndicators(): void {
        if (!this.skillTargets.length) {
            console.warn(`❌ No skill targets available`);
            return;
        }
        
        if (!SCENE_GLOBAL) {
            console.warn(`❌ Scene not available`);
            return;
        }
        
        console.log(`🔮 Creating ${this.skillTargets.length} skill target indicators`);
        
        let indicatorsCreated = 0;
        for (const target of this.skillTargets) {
            const indicator = this.createSkillTargetIndicator(target);
            if (indicator) {
                const key = `${target.x},${target.y}`;
                this.skillTargetIndicators.set(key, indicator);
                indicatorsCreated++;
            }
        }
        
        console.log(`🎯 Successfully created ${indicatorsCreated}/${this.skillTargets.length} skill target indicators`);
    }

    private createSkillTargetIndicator(position: Position): THREE.Mesh | null {
        if (!SCENE_GLOBAL) return null;
        
        // Create purple skill target indicator
        const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
        
        let material: THREE.MeshBasicMaterial;
        
        if (this.hoverSelectTexture) {
            material = new THREE.MeshBasicMaterial({
                map: this.hoverSelectTexture,
                transparent: true,
                opacity: 0.7,
                color: 0x8e44ad, // Purple tint for skills
                alphaTest: 0.1,
                depthTest: true,
                depthWrite: false,
                side: THREE.DoubleSide
            });
        } else {
            material = new THREE.MeshBasicMaterial({
                color: 0x8e44ad, // Purple color for skills
                transparent: true,
                opacity: 0.6,
                depthTest: true,
                depthWrite: false,
                side: THREE.DoubleSide
            });
        }
        
        const indicatorMesh = new THREE.Mesh(geometry, material);
        
        // Position it at the tile center
        const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
        const worldZ = 1.2;
        
        indicatorMesh.position.set(worldX, worldY, worldZ);
        
        SCENE_GLOBAL.add(indicatorMesh);
        
        return indicatorMesh;
    }

    private clearSkillIndicators(): void {
        // Clear skill target indicators
        for (const [key, indicator] of this.skillTargetIndicators) {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(indicator);
            }
        }
        this.skillTargetIndicators.clear();
        
        // Clear skill preview indicators
        for (const [key, indicator] of this.skillPreviewIndicators) {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(indicator);
            }
        }
        this.skillPreviewIndicators.clear();
        
        console.log(`🧹 Cleared skill indicators`);
    }

    public exitActionPhase(): void {
        console.log(`🚫 Exiting action phase`);
        
        this.selectedAttackTarget = null;
        this.attackData = null;
        this.selectedSkillTarget = null;
        this.skillTargets = [];
        this.currentSkill = null;
        
        // Clear all indicators
        this.clearAttackIndicators();
        this.clearSkillIndicators();
    }

    private calculateValidAttackTargets(unit: Unit, currentPosition: Position): MovementData {
        const validTiles: Position[] = [];
        const paths = new Map<string, Position[]>();
        const attackRange = unit.range || 1;
        
        console.log(`⚔️ Calculating attack targets for ${unit.name} with attack range ${attackRange}`);
        
        // Calculate all tiles within attack range
        for (let dx = -attackRange; dx <= attackRange; dx++) {
            for (let dy = -attackRange; dy <= attackRange; dy++) {
                const distance = Math.abs(dx) + Math.abs(dy); // Manhattan distance
                
                if (distance > 0 && distance <= attackRange) {
                    const targetX = currentPosition.x + dx;
                    const targetY = currentPosition.y + dy;
                    
                    // Check if position is within map bounds
                    if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
                        validTiles.push({ x: targetX, y: targetY });
                        paths.set(`${targetX},${targetY}`, [currentPosition, { x: targetX, y: targetY }]);
                    }
                }
            }
        }
        
        console.log(`🎯 Found ${validTiles.length} valid attack tiles`);
        return { validTiles, paths };
    }

    public createAttackIndicators(): void {
        if (!this.attackData) {
            console.warn(`❌ No attack data available`);
            return;
        }
        
        if (!SCENE_GLOBAL) {
            console.warn(`❌ Scene not available`);
            return;
        }
        
        console.log(`🔴 Creating ${this.attackData.validTiles.length} attack indicators`);
        
        let indicatorsCreated = 0;
        for (const tile of this.attackData.validTiles) {
            const indicator = this.createAttackIndicator(tile);
            if (indicator) {
                const key = `${tile.x},${tile.y}`;
                this.attackIndicators.set(key, indicator);
                indicatorsCreated++;
            }
        }
        
        console.log(`🎯 Successfully created ${indicatorsCreated}/${this.attackData.validTiles.length} attack indicators`);
    }

    private createAttackIndicator(position: Position): THREE.Mesh | null {
        if (!SCENE_GLOBAL) return null;
        
        // Create red attack indicator
        const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
        
        let material: THREE.MeshBasicMaterial;
        
        if (this.hoverSelectTexture) {
            material = new THREE.MeshBasicMaterial({
                map: this.hoverSelectTexture,
                transparent: true,
                opacity: 0.7,
                color: 0xff4444, // Red tint
                alphaTest: 0.1,
                depthTest: true,
                depthWrite: false,
                side: THREE.DoubleSide
            });
        } else {
            material = new THREE.MeshBasicMaterial({
                color: 0xff4444, // Red color
                transparent: true,
                opacity: 0.6,
                depthTest: true,
                depthWrite: false,
                side: THREE.DoubleSide
            });
        }
        
        const indicatorMesh = new THREE.Mesh(geometry, material);
        
        // Position it at the tile center
        const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
        const worldZ = 1.2;
        
        indicatorMesh.position.set(worldX, worldY, worldZ);
        
        SCENE_GLOBAL.add(indicatorMesh);
        
        return indicatorMesh;
    }

    private clearAttackIndicators(): void {
        for (const [key, indicator] of this.attackIndicators) {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(indicator);
            }
        }
        this.attackIndicators.clear();
        console.log(`🧹 Cleared attack indicators`);
    }

    public selectAttackTarget(x: number, y: number, getUnitAtPosition: (x: number, y: number) => Unit | null, selectedUnit: Unit): { success: boolean; targetUnit: Unit | null } {
        console.log(`🎯 selectAttackTarget called with position (${x}, ${y})`);
        
        // For skills in skill mode, check if it's an adjacent-attack skill
        if (this.currentAttackMode === 'skill') {
            if (this.currentSkill?.targetingType === 'adjacent-attack') {
                // For adjacent-attack skills, validate using attack indicators (like basic attacks)
                const key = `${x},${y}`;
                if (!this.attackIndicators.has(key)) {
                    console.warn(`❌ Tile (${x}, ${y}) is not a valid attack target for adjacent-attack skill`);
                    return { success: false, targetUnit: null };
                }
                
                // Check if there's an enemy unit at this position
                const targetUnit = getUnitAtPosition(x, y);
                if (!targetUnit) {
                    console.warn(`❌ No unit at position (${x}, ${y})`);
                    return { success: false, targetUnit: null };
                }
                
                // Check if target is on opposing team
                if (targetUnit.team === selectedUnit.team) {
                    console.warn(`❌ Cannot attack unit on same team: ${targetUnit.name}`);
                    return { success: false, targetUnit: null };
                }
                
                console.log(`⚔️ Selected adjacent-attack target: ${targetUnit.name} at (${x}, ${y})`);
                this.selectedAttackTarget = targetUnit;
                
                return { success: true, targetUnit };
            } else {
                // For other skills, use skill target validation
                return this.selectSkillTarget(x, y, selectedUnit);
            }
        }
        
        // For basic attacks, use attack indicator validation
        const key = `${x},${y}`;
        if (!this.attackIndicators.has(key)) {
            console.warn(`❌ Tile (${x}, ${y}) is not a valid attack target`);
            return { success: false, targetUnit: null };
        }
        
        // Check if there's an enemy unit at this position
        const targetUnit = getUnitAtPosition(x, y);
        if (!targetUnit) {
            console.warn(`❌ No unit at position (${x}, ${y})`);
            return { success: false, targetUnit: null };
        }
        
        // Check if target is on opposing team
        if (targetUnit.team === selectedUnit.team) {
            console.warn(`❌ Cannot attack unit on same team: ${targetUnit.name}`);
            return { success: false, targetUnit: null };
        }
        
        console.log(`🎯 Selected attack target: ${targetUnit.name} at (${x}, ${y})`);
        this.selectedAttackTarget = targetUnit;
        
        return { success: true, targetUnit };
    }

    public selectSkillTarget(x: number, y: number, selectedUnit: Unit): { success: boolean; targetUnit: Unit | null } {
        console.log(`✨ selectSkillTarget called with position (${x}, ${y})`);
        
        if (!this.currentSkill) {
            console.warn('❌ No skill selected');
            return { success: false, targetUnit: null };
        }
        
        const key = `${x},${y}`;
        if (!this.skillTargetIndicators.has(key)) {
            console.warn(`❌ Tile (${x}, ${y}) is not a valid skill target`);
            return { success: false, targetUnit: null };
        }
        
        console.log(`✨ Selected skill target position: (${x}, ${y}) for ${this.currentSkill.name}`);
        this.selectedSkillTarget = { x, y };
        
        // Show preview of affected areas
        this.showSkillPreview(x, y);
        
        return { success: true, targetUnit: null }; // Skills don't need specific target units
    }

    public showSkillPreview(centerX: number, centerY: number): void {
        if (!this.currentSkill) return;
        
        // Clear any existing preview
        this.clearSkillPreview();
        
        // Get the affected positions from the skill pattern
        // Pass rotation for dual-rotational skills
        const affectedPositions = this.currentSkill.getTargetPattern(
            centerX, 
            centerY, 
            undefined, 
            this.currentSkill.targetingType === 'dual-rotational' ? this.currentRotation : undefined
        );
        
        console.log(`🔮 Showing skill preview for ${this.currentSkill.name} at (${centerX}, ${centerY})`);
        console.log(`🎯 Affected positions:`, affectedPositions);
        
        // Create preview indicators for affected areas
        for (const pos of affectedPositions) {
            const indicator = this.createSkillPreviewIndicator(pos);
            if (indicator) {
                const key = `${pos.x},${pos.y}`;
                this.skillPreviewIndicators.set(key, indicator);
            }
        }
    }

    private createSkillPreviewIndicator(position: { x: number; y: number }): THREE.Mesh | null {
        if (!SCENE_GLOBAL) return null;
        
        // Create bright orange/yellow indicators for skill affected areas
        const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
        
        const material = new THREE.MeshBasicMaterial({
            color: 0xff6b35, // Bright orange for skill effects
            transparent: true,
            opacity: 0.8,
            depthTest: true,
            depthWrite: false,
            side: THREE.DoubleSide
        });
        
        const indicatorMesh = new THREE.Mesh(geometry, material);
        
        // Position it at the tile center
        const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
        const worldZ = 1.3; // Slightly higher than target indicators
        
        indicatorMesh.position.set(worldX, worldY, worldZ);
        
        SCENE_GLOBAL.add(indicatorMesh);
        
        return indicatorMesh;
    }

    private clearSkillPreview(): void {
        for (const [key, indicator] of this.skillPreviewIndicators) {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(indicator);
            }
        }
        this.skillPreviewIndicators.clear();
    }

    public getSelectedAttackTarget(): Unit | null {
        return this.selectedAttackTarget;
    }

    public getCurrentAttackMode(): 'basic' | 'skill' {
        return this.currentAttackMode;
    }

    public getCurrentSkill(): Skill | null {
        return this.currentSkill;
    }

    public getSelectedSkillTarget(): Position | null {
        return this.selectedSkillTarget;
    }

    public setSkillTarget(skill: Skill, position: Position): void {
        console.log(`✨ Setting skill target for ${skill.name} at (${position.x}, ${position.y})`);
        this.currentSkill = skill;
        this.selectedSkillTarget = position;
        this.currentAttackMode = 'skill';
    }

    public confirmAttack(selectedUnit: Unit): { damage: number; targetUnit: Unit } | null {
        if (!selectedUnit || !this.selectedAttackTarget) {
            console.warn('❌ No unit or target selected for attack');
            return null;
        }
        
        console.log(`⚔️ Confirming attack: ${selectedUnit.name} attacks ${this.selectedAttackTarget.name}`);
        
        // Deal basic damage
        const damage = selectedUnit.basicDamage || 5;
        this.selectedAttackTarget.currentHealth = Math.max(0, this.selectedAttackTarget.currentHealth - damage);
        
        console.log(`💥 ${this.selectedAttackTarget.name} takes ${damage} damage! Health: ${this.selectedAttackTarget.currentHealth}/${this.selectedAttackTarget.health}`);
        
        // Handle kinetic energy gain after basic attack
        if (selectedUnit.energyType.toLowerCase() === 'kinetic') {
            const energyGain = Math.min(5, selectedUnit.maxEnergy - selectedUnit.currentEnergy);
            
            if (energyGain > 0) {
                selectedUnit.currentEnergy += energyGain;
                console.log(`⚡ ${selectedUnit.name} gained ${energyGain} energy from basic attack (${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy})`);
                console.log(`🔄 About to update grid bars for attacking unit: ${selectedUnit.name}`);
            }
        }
        
        // Check if unit died
        if (this.selectedAttackTarget.currentHealth <= 0) {
            this.selectedAttackTarget.isAlive = false;
            console.log(`💀 ${this.selectedAttackTarget.name} has died!`);
        }
        
        const result = { damage, targetUnit: this.selectedAttackTarget };
        
        // Clear attack state
        this.selectedAttackTarget = null;
        
        return result;
    }

    public cancelAttack(): void {
        console.log(`❌ Cancelling attack selection`);
        this.selectedAttackTarget = null;
    }

    public resetRotation(): void {
        this.currentRotation = 0;
    }

    public confirmSkill(selectedUnit: Unit, getUnitAtPosition: (x: number, y: number) => Unit | null): { affectedUnits: Array<{ unit: Unit; damage: number }> } | null {
        if (!selectedUnit || !this.currentSkill) {
            console.warn('❌ No unit or skill selected for skill execution');
            return null;
        }
        
        // For adjacent-attack skills, validate selectedAttackTarget instead of selectedSkillTarget
        if (this.currentSkill.targetingType === 'adjacent-attack') {
            if (!this.selectedAttackTarget) {
                console.warn('❌ No attack target selected for adjacent-attack skill execution');
                return null;
            }
        } else {
            if (!this.selectedSkillTarget) {
                console.warn('❌ No skill target selected for skill execution');
                return null;
            }
        }
        
        console.log(`✨ Confirming skill: ${selectedUnit.name} uses ${this.currentSkill.name}`);
        console.log(`🔥 DEBUG: Skill emoji is: "${this.currentSkill.emoji}"`);
        
        // Deduct energy cost
        if (selectedUnit.currentEnergy < this.currentSkill.energyCost) {
            console.warn(`❌ Not enough energy for ${this.currentSkill.name}`);
            return null;
        }
        
        selectedUnit.currentEnergy = Math.max(0, selectedUnit.currentEnergy - this.currentSkill.energyCost);
        console.log(`⚡ ${selectedUnit.name} spent ${this.currentSkill.energyCost} energy (${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy})`);
        
        const affectedUnits: Array<{ unit: Unit; damage: number }> = [];
        
        // Handle different skill targeting types
        if (this.currentSkill.targetingType === 'adjacent-attack') {
            // For adjacent-attack skills like Hurricane Slash, target the selected enemy unit
            if (!this.selectedAttackTarget) {
                console.warn('❌ No attack target selected for adjacent-attack skill');
                return null;
            }
            
            const targetUnit = this.selectedAttackTarget;
            const damage = selectedUnit.skillDamage + this.currentSkill.bonusDamage;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - damage);
            
            console.log(`${this.currentSkill.emoji}💥 ${targetUnit.name} takes ${damage} skill damage from ${this.currentSkill.name}! Health: ${targetUnit.currentHealth}/${targetUnit.health}`);
            
            // Check if unit died
            if (targetUnit.currentHealth <= 0) {
                targetUnit.isAlive = false;
                console.log(`💀 ${targetUnit.name} has died from ${this.currentSkill.name}!`);
            }
            
            affectedUnits.push({ unit: targetUnit, damage });
            
            // Clear attack target for adjacent-attack skills
            this.selectedAttackTarget = null;
        } else {
            // For area-effect skills, get affected positions based on skill pattern and rotation
            if (!this.selectedSkillTarget) {
                console.warn('❌ No skill target selected for area-effect skill');
                return null;
            }
            
            const affectedPositions = this.currentSkill.getTargetPattern(
                this.selectedSkillTarget.x,
                this.selectedSkillTarget.y,
                undefined,
                this.currentSkill.targetingType === 'dual-rotational' ? this.currentRotation : undefined
            );
        
            // Apply damage to all affected positions
            for (const pos of affectedPositions) {
                const targetUnit = getUnitAtPosition(pos.x, pos.y);
                if (targetUnit) {
                    // Check if this is a healing skill (Universal Whisper)
                    if (this.currentSkill.id === 'universal-whisper') {
                        // Healing skill - heal allies only, ignore enemies
                        if (targetUnit.team === selectedUnit.team) {
                            const healAmount = selectedUnit.skillDamage + this.currentSkill.bonusDamage;
                            const previousHealth = targetUnit.currentHealth;
                            targetUnit.currentHealth = Math.min(targetUnit.health, targetUnit.currentHealth + healAmount);
                            const actualHealAmount = targetUnit.currentHealth - previousHealth;
                            
                            console.log(`${this.currentSkill.emoji}💚 ${targetUnit.name} healed for ${actualHealAmount} health from ${this.currentSkill.name}! Health: ${targetUnit.currentHealth}/${targetUnit.health}`);
                            
                            affectedUnits.push({ unit: targetUnit, damage: -actualHealAmount }); // Negative damage = healing
                        }
                    } else {
                        // Damage skill - damage enemies only, ignore allies
                        if (targetUnit.team !== selectedUnit.team) {
                            const damage = selectedUnit.skillDamage + this.currentSkill.bonusDamage;
                            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - damage);
                            
                            console.log(`${this.currentSkill.emoji}💥 ${targetUnit.name} takes ${damage} skill damage from ${this.currentSkill.name}! Health: ${targetUnit.currentHealth}/${targetUnit.health}`);
                            
                            // Check if unit died
                            if (targetUnit.currentHealth <= 0) {
                                targetUnit.isAlive = false;
                                console.log(`💀 ${targetUnit.name} has died from ${this.currentSkill.name}!`);
                            }
                            
                            affectedUnits.push({ unit: targetUnit, damage });
                        }
                    }
                }
            }
        }
        
        const result = { affectedUnits };
        
        // Clear skill state
        this.selectedSkillTarget = null;
        this.currentSkill = null;
        this.resetRotation();
        
        return result;
    }

    public cleanup(): void {
        this.clearAttackIndicators();
        this.clearSkillIndicators();
        this.selectedAttackTarget = null;
        this.attackData = null;
        this.selectedSkillTarget = null;
        this.skillTargets = [];
        this.currentSkill = null;
        this.resetRotation();
    }

    // Rotation methods for dual-rotational skills
    public rotateSkillTargets(): void {
        if (!this.currentSkill || this.currentSkill.targetingType !== 'dual-rotational') {
            console.warn('❌ Cannot rotate non-dual-rotational skill');
            return;
        }
        
        this.currentRotation = (this.currentRotation + 1) % 4;
        console.log(`🔄 Rotated skill targets: rotation=${this.currentRotation}`);
        
        // Update preview if we have a selected target
        if (this.selectedSkillTarget) {
            this.showSkillPreview(this.selectedSkillTarget.x, this.selectedSkillTarget.y);
        }
    }

    public getCurrentRotation(): number {
        return this.currentRotation;
    }
} 