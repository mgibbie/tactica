import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';
import { ModifierService } from './ModifierService';
import { ActionState } from './ActionState';
import { globalTileEffectManager } from './TileEffect';
import { globalTileEffectRenderer } from './TileEffectRenderer';
import { Position } from './NavigationManager';
import { PassiveService } from './PassiveService';
import { globalUnitFactory } from '../units/UnitFactory';
import { UNIT_DEX } from '../units/UnitDex';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';

export interface SkillResult {
    success: boolean;
    affectedUnits: Unit[];
    skill: Skill;
    damageDealt?: Map<string, number>; // Map unit.id to final damage dealt
}

export class SkillHandler {
    private actionState: ActionState;

    constructor(actionState: ActionState) {
        this.actionState = actionState;
    }

    public setSkillTargeting(skill: Skill, validTargets: { x: number; y: number }[]): void {
        console.log(`🎯 Setting skill targeting for ${skill.name} with ${validTargets.length} targets`);
        this.actionState.setCurrentSkill(skill);
        this.actionState.setValidSkillTargets(validTargets);
        this.actionState.setSelectedSkillTarget(null);
        this.actionState.setSkillRotation(0);
    }

    public setSkillTarget(skill: Skill, targetPosition: { x: number; y: number }): void {
        console.log(`🎯 Setting skill target for ${skill.name} at (${targetPosition.x}, ${targetPosition.y})`);
        this.actionState.setCurrentSkill(skill);
        this.actionState.setSelectedSkillTarget(targetPosition);
        
        // Reset rotation to 0 for all skills (north direction)
        this.actionState.setSkillRotation(0);
    }

    public selectTarget(
        x: number,
        y: number,
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        selectedUnit: Unit
    ): { success: boolean; targetUnit: Unit | null } {
        console.log(`🎯 Attempting to select skill target at (${x}, ${y})`);
        
        const validSkillTargets = this.actionState.getValidSkillTargets();
        const currentAttackData = this.actionState.getCurrentAttackData();
        
        if (!validSkillTargets.length && !currentAttackData) {
            console.warn("❌ No skill targets or attack data available");
            return { success: false, targetUnit: null };
        }
        
        let isValidTarget = false;
        
        if (validSkillTargets.length > 0) {
            // For skills using validSkillTargets (dual-rotational, etc.)
            isValidTarget = validSkillTargets.some(tile => 
                tile.x === x && tile.y === y
            );
        } else if (currentAttackData) {
            // For adjacent-attack skills using currentAttackData
            isValidTarget = currentAttackData.validTiles.some(tile => 
                tile.x === x && tile.y === y
            );
        }
        
        if (!isValidTarget) {
            console.log(`❌ Invalid skill target: (${x}, ${y}) - not in valid targets`);
            return { success: false, targetUnit: null };
        }
        
        this.actionState.setSelectedSkillTarget({ x, y });
        const targetUnit = getUnitAtPosition(x, y);
        this.actionState.setTargetUnit(targetUnit);
        console.log(`✅ Selected skill target at (${x}, ${y})${targetUnit ? ` with unit ${targetUnit.name}` : ' (empty tile)'}`);
        return { success: true, targetUnit };
    }

    public rotateSkillTargets(): void {
        console.log('🔄 Rotating skill targets');
        
        const currentSkill = this.actionState.getCurrentSkill();
        const selectedTarget = this.actionState.getSelectedSkillTarget();
        
        if (!currentSkill || !selectedTarget) {
            console.warn('❌ No skill or target selected for rotation');
            return;
        }
        
        const newRotation = this.actionState.rotateSkill();
        console.log(`🔄 Rotated to step ${newRotation}`);
    }

    public confirmSkill(
        selectedUnit: Unit,
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        getUnitPosition?: (unit: Unit) => Position | null
    ): SkillResult | null {
        const currentSkill = this.actionState.getCurrentSkill();
        if (!currentSkill) {
            console.warn("❌ No skill selected");
            return null;
        }
        
        const targetPosition = this.actionState.getSelectedSkillTarget();
        if (!targetPosition) {
            console.warn("❌ No skill target selected");
            return null;
        }
        
        console.log(`🎯 Executing skill: ${currentSkill.name} at position (${targetPosition.x}, ${targetPosition.y})`);
        
        // Calculate total skill damage
        const totalSkillDamage = selectedUnit.skillDamage + (currentSkill.bonusDamage || 0);
        console.log(`💥 Total skill damage calculation: ${selectedUnit.skillDamage} + ${currentSkill.bonusDamage || 0} = ${totalSkillDamage}`);
        // Special handling for Solar Ray - generic damage to enemy within range 3
        if (currentSkill?.id === 'solar-ray') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Solar Ray at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Solar Ray on allied unit ${targetUnit.name}.`);
                return null;
            }

            // Ensure target within range 3
            const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPos) return null;
            const distance = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
            if (distance < 1 || distance > 3) {
                console.warn('❌ Solar Ray requires target within range 3');
                return null;
            }

            const baseDamage = totalSkillDamage;
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;

            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            console.log(`☀️ ${targetUnit.name} takes ${finalDamage} damage from Solar Ray: ${oldHealth} → ${targetUnit.currentHealth}/${targetUnit.health}`);

            const damageDealt = new Map<string, number>();
            damageDealt.set(targetUnit.id, finalDamage);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                if (gameSceneInstance.animationManager) {
                    gameSceneInstance.animationManager.showSkillEffectAnimation(
                        targetUnit,
                        finalDamage,
                        '☀️',
                        (u: Unit) => gameSceneInstance.unitRenderer.getUnitPosition(u),
                        (u: Unit) => gameSceneInstance.unitRenderer.getUnitMesh(u),
                        false
                    );
                }
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }
        // Special handling for Builder: Box Drop – create a Box structure
        if (currentSkill?.id === 'box-drop') {
            // Range = 4 and must target an unoccupied tile
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Box Drop');
                return null;
            }
            const manhattan = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (manhattan < 1 || manhattan > 4) {
                console.warn('❌ Box Drop target out of range (requires 1-4)');
                return null;
            }

            // Ensure tile is unoccupied
            const occupying = getUnitAtPosition ? getUnitAtPosition(targetPosition.x, targetPosition.y) : null;
            if (occupying) {
                console.warn('❌ Box Drop target tile is occupied');
                return null;
            }

            // Ensure sufficient energy after modifiers processing
            if (selectedUnit.currentEnergy < currentSkill.energyCost) {
                console.warn(`❌ Not enough energy for ${currentSkill.name} after action modifiers. Required: ${currentSkill.energyCost}, Current: ${selectedUnit.currentEnergy}`);
                return null;
            }
            selectedUnit.currentEnergy -= currentSkill.energyCost;
            console.log(`📦 ${selectedUnit.name} uses ${currentSkill.energyCost} energy for Box Drop, remaining: ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);

            // Create a Box unit with specified stats and flags
            const boxTemplate = UNIT_DEX['box'];
            const boxUnit = boxTemplate ? globalUnitFactory.createUnit('box', selectedUnit.team) : null;

            if (boxUnit) {
                // Ensure structure flags
                boxUnit.team = selectedUnit.team;
                boxUnit.isStructure = true;
                boxUnit.isSubUnit = true;
                boxUnit.isTargetable = false;
                (boxUnit as any).creatorUnitId = selectedUnit.id;
                // Register on correct team list (so it renders and exists on board) but should not count for turns/victory later
                if (selectedUnit.team === 'player') {
                    globalUnitRegistry.playerParty.push(boxUnit);
                } else {
                    globalUnitRegistry.enemyUnits.push(boxUnit);
                }

                // Place visually
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance) {
                    // Fire-and-forget placement; no need to await in sync handler
                    gameSceneInstance.placeUnit(boxUnit, targetPosition.x, targetPosition.y).then(() => {});
                }

                // Notify round manager that a unit was added so turn limits recalc (it will exclude structures later)
                try {
                    GAME_TURN_MANAGER?.onUnitAdded(boxUnit.id, boxUnit.team);
                } catch {}

                // Process post-skill passives
                PassiveService.processPostSkillPassives(selectedUnit, currentSkill, []);

                return {
                    success: true,
                    affectedUnits: [],
                    skill: currentSkill
                };
            }

            return null;
        }

        // Special handling for Builder: Create Turret – create a Turret structure with Sentry
        if (currentSkill?.id === 'create-turret') {
            // Range = 4 and must target an unoccupied tile (reuse same checks as box)
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Create Turret');
                return null;
            }
            const manhattan = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (manhattan < 1 || manhattan > 4) {
                console.warn('❌ Create Turret target out of range (requires 1-4)');
                return null;
            }
            const occupying = getUnitAtPosition ? getUnitAtPosition(targetPosition.x, targetPosition.y) : null;
            if (occupying) {
                console.warn('❌ Create Turret target tile is occupied');
                return null;
            }
            if (selectedUnit.currentEnergy < currentSkill.energyCost) {
                console.warn(`❌ Not enough energy for ${currentSkill.name} after action modifiers. Required: ${currentSkill.energyCost}, Current: ${selectedUnit.currentEnergy}`);
                return null;
            }
            selectedUnit.currentEnergy -= currentSkill.energyCost;
            console.log(`🛡️ ${selectedUnit.name} uses ${currentSkill.energyCost} energy for Create Turret, remaining: ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);

            const turretUnit = globalUnitFactory.createUnit('turret', selectedUnit.team);
            if (turretUnit) {
                // Ensure structure flags
                turretUnit.team = selectedUnit.team;
                turretUnit.isStructure = true;
                turretUnit.isSubUnit = true;
                turretUnit.isTargetable = false;
                (turretUnit as any).creatorUnitId = selectedUnit.id;
                if (selectedUnit.team === 'player') {
                    globalUnitRegistry.playerParty.push(turretUnit);
                } else {
                    globalUnitRegistry.enemyUnits.push(turretUnit);
                }
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance) {
                    gameSceneInstance.placeUnit(turretUnit, targetPosition.x, targetPosition.y).then(() => {});
                }
                try {
                    GAME_TURN_MANAGER?.onUnitAdded(turretUnit.id, turretUnit.team);
                } catch {}
                PassiveService.processPostSkillPassives(selectedUnit, currentSkill, []);
                return {
                    success: true,
                    affectedUnits: [],
                    skill: currentSkill
                };
            }
            return null;
        }

        // Special handling for Shieldbearer: Barricade – create a Barricade structure with Tall
        if (currentSkill?.id === 'barricade') {
            // Range = 4 and must target an unoccupied tile
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Barricade');
                return null;
            }
            const manhattan = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (manhattan < 1 || manhattan > 4) {
                console.warn('❌ Barricade target out of range (requires 1-4)');
                return null;
            }
            const occupying = getUnitAtPosition ? getUnitAtPosition(targetPosition.x, targetPosition.y) : null;
            if (occupying) {
                console.warn('❌ Barricade target tile is occupied');
                return null;
            }
            if (selectedUnit.currentEnergy < currentSkill.energyCost) {
                console.warn(`❌ Not enough energy for ${currentSkill.name} after action modifiers. Required: ${currentSkill.energyCost}, Current: ${selectedUnit.currentEnergy}`);
                return null;
            }
            selectedUnit.currentEnergy -= currentSkill.energyCost;
            console.log(`🧱 ${selectedUnit.name} uses ${currentSkill.energyCost} energy for Barricade, remaining: ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);

            const barricadeUnit = globalUnitFactory.createUnit('barricade', selectedUnit.team);
            if (barricadeUnit) {
                // Ensure structure flags and Tall passive
                barricadeUnit.team = selectedUnit.team;
                barricadeUnit.isStructure = true;
                barricadeUnit.isSubUnit = true;
                barricadeUnit.isTargetable = false;
                barricadeUnit.isTall = true;
                (barricadeUnit as any).creatorUnitId = selectedUnit.id;

                if (selectedUnit.team === 'player') {
                    globalUnitRegistry.playerParty.push(barricadeUnit);
                } else {
                    globalUnitRegistry.enemyUnits.push(barricadeUnit);
                }
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance) {
                    gameSceneInstance.placeUnit(barricadeUnit, targetPosition.x, targetPosition.y).then(() => {});
                }
                try {
                    GAME_TURN_MANAGER?.onUnitAdded(barricadeUnit.id, barricadeUnit.team);
                } catch {}
                PassiveService.processPostSkillPassives(selectedUnit, currentSkill, []);
                return {
                    success: true,
                    affectedUnits: [],
                    skill: currentSkill
                };
            }
            return null;
        }

        // Special handling for Shieldbearer: The Wall – create a line of 5 Barricades centered 2 away in facing cardinal direction
        if (currentSkill?.id === 'the-wall') {
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;
            if (selectedUnit.currentEnergy < currentSkill.energyCost) return null;
            // Determine rotation (0=N,1=E,2=S,3=W) from action state
            const rotation = this.actionState.getSkillRotation ? this.actionState.getSkillRotation() : 0;
            const center = { x: casterPosition.x, y: casterPosition.y };
            switch (rotation % 4) {
                case 0: center.y -= 2; break;
                case 1: center.x += 2; break;
                case 2: center.y += 2; break;
                case 3: center.x -= 2; break;
            }
            const linePositions: { x: number; y: number }[] = [];
            if (rotation % 4 === 0 || rotation % 4 === 2) {
                for (let dx = -2; dx <= 2; dx++) linePositions.push({ x: center.x + dx, y: center.y });
            } else {
                for (let dy = -2; dy <= 2; dy++) linePositions.push({ x: center.x, y: center.y + dy });
            }
            // Spend energy
            selectedUnit.currentEnergy -= currentSkill.energyCost;
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const created: Unit[] = [];
            for (const pos of linePositions) {
                if (pos.x < 0 || pos.x >= 8 || pos.y < 0 || pos.y >= 8) continue;
                const occupying = getUnitAtPosition ? getUnitAtPosition(pos.x, pos.y) : null;
                if (occupying) continue;
                const b = globalUnitFactory.createUnit('barricade', selectedUnit.team);
                if (!b) continue;
                b.team = selectedUnit.team;
                b.isStructure = true;
                b.isSubUnit = true;
                b.isTargetable = false;
                b.isTall = true;
                (b as any).creatorUnitId = selectedUnit.id;
                if (selectedUnit.team === 'player') {
                    globalUnitRegistry.playerParty.push(b);
                } else {
                    globalUnitRegistry.enemyUnits.push(b);
                }
                if (gameSceneInstance) {
                    gameSceneInstance.placeUnit(b, pos.x, pos.y).then(() => {});
                }
                try { GAME_TURN_MANAGER?.onUnitAdded(b.id, b.team); } catch {}
                created.push(b);
            }
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, created);
            return {
                success: true,
                affectedUnits: created,
                skill: currentSkill
            };
        }

        // Special handling for Bannerman: Plant the Flag – create a Flag structure with Flag Fervor
        if (currentSkill?.id === 'plant-the-flag') {
            // Range = 1 and must target an unoccupied tile
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Plant the Flag');
                return null;
            }
            const manhattan = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (manhattan < 1 || manhattan > 1) {
                console.warn('❌ Plant the Flag target out of range (requires exactly 1)');
                return null;
            }
            const occupying = getUnitAtPosition ? getUnitAtPosition(targetPosition.x, targetPosition.y) : null;
            if (occupying) {
                console.warn('❌ Plant the Flag target tile is occupied');
                return null;
            }
            if (selectedUnit.currentEnergy < currentSkill.energyCost) {
                console.warn(`❌ Not enough energy for ${currentSkill.name} after action modifiers. Required: ${currentSkill.energyCost}, Current: ${selectedUnit.currentEnergy}`);
                return null;
            }
            selectedUnit.currentEnergy -= currentSkill.energyCost;
            console.log(`🏴 ${selectedUnit.name} uses ${currentSkill.energyCost} energy for Plant the Flag, remaining: ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);

            const flagUnit = globalUnitFactory.createUnit('flag', selectedUnit.team);
            if (flagUnit) {
                // Ensure structure flags
                flagUnit.team = selectedUnit.team;
                flagUnit.isStructure = true;
                flagUnit.isSubUnit = true;
                flagUnit.isTargetable = false;
                (flagUnit as any).creatorUnitId = selectedUnit.id;
                if (selectedUnit.team === 'player') {
                    globalUnitRegistry.playerParty.push(flagUnit);
                } else {
                    globalUnitRegistry.enemyUnits.push(flagUnit);
                }
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance) {
                    gameSceneInstance.placeUnit(flagUnit, targetPosition.x, targetPosition.y).then(() => {});
                }
                try {
                    GAME_TURN_MANAGER?.onUnitAdded(flagUnit.id, flagUnit.team);
                } catch {}
                PassiveService.processPostSkillPassives(selectedUnit, currentSkill, []);
                return {
                    success: true,
                    affectedUnits: [],
                    skill: currentSkill
                };
            }
            return null;
        }

        // Special handling for Builder: Deployable Spring – place a directional spring tile
        if (currentSkill?.id === 'deployable-spring') {
            // Range = 2 and must target an unoccupied tile
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Deployable Spring');
                return null;
            }
            const manhattan = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (manhattan < 1 || manhattan > 2) {
                console.warn('❌ Deployable Spring target out of range (requires 1-2)');
                return null;
            }
            const occupying = getUnitAtPosition ? getUnitAtPosition(targetPosition.x, targetPosition.y) : null;
            if (occupying) {
                console.warn('❌ Deployable Spring target tile is occupied');
                return null;
            }
            if (selectedUnit.currentEnergy < currentSkill.energyCost) {
                console.warn(`❌ Not enough energy for ${currentSkill.name}. Required: ${currentSkill.energyCost}, Current: ${selectedUnit.currentEnergy}`);
                return null;
            }

            // Determine spring direction from action state's rotation (0=N,1=E,2=S,3=W)
            const rotation = this.actionState.getSkillRotation ? this.actionState.getSkillRotation() : 0;
            const dir = rotation % 4;
            const direction: 'north' | 'east' | 'south' | 'west' = dir === 0 ? 'north' : dir === 1 ? 'east' : dir === 2 ? 'south' : 'west';

            // Consume energy
            selectedUnit.currentEnergy -= currentSkill.energyCost;
            console.log(`🌀 ${selectedUnit.name} uses ${currentSkill.energyCost} energy to place a Spring Tile facing ${direction}`);

            // Add spring tile with custom direction data
            const instanceId = globalTileEffectManager.addEffect(
                'spring-tile',
                { x: targetPosition.x, y: targetPosition.y },
                -1,
                selectedUnit.id,
                { direction }
            );
            if (instanceId) {
                globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
            }

            // Process post-skill passives (no direct affected units)
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, []);

            return {
                success: true,
                affectedUnits: [],
                skill: currentSkill
            };
        }
        
        // Process action modifiers (like Shocked) before performing the skill
        const actionModifierResult = ModifierService.processActionModifiers(selectedUnit);
        if (actionModifierResult.triggeredModifiers.length > 0) {
            console.log(`⚡ Action modifiers triggered for ${selectedUnit.name}: ${actionModifierResult.triggeredModifiers.join(', ')}`);
        }
        
        // Handle deaths from action modifiers (e.g., headache damage)
        if (actionModifierResult.unitsThatDied.length > 0) {
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance) {
                actionModifierResult.unitsThatDied.forEach(deadUnit => {
                    console.log(`💀 Handling death from action modifier: ${deadUnit.name}`);
                    gameSceneInstance.handleUnitDeath(deadUnit);
                });
            }
        }
        
        // Check if unit still has enough energy after action modifiers
        if (selectedUnit.currentEnergy < currentSkill.energyCost) {
            console.warn(`❌ Not enough energy for ${currentSkill.name} after action modifiers. Required: ${currentSkill.energyCost}, Current: ${selectedUnit.currentEnergy}`);
            
            // Show failed animation on the unit that tried to use the skill
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.animationManager && gameSceneInstance.unitRenderer) {
                gameSceneInstance.animationManager.showFailedTextPopup(
                    selectedUnit,
                    (unit: Unit) => gameSceneInstance.unitRenderer.getUnitPosition(unit)
                );
                console.log(`🎬 Showing FAILED animation for ${selectedUnit.name} due to insufficient energy after action modifiers`);
            }
            
            return null;
        }
        
        // Reduce energy
        selectedUnit.currentEnergy -= currentSkill.energyCost;
        console.log(`⚡ ${selectedUnit.name} uses ${currentSkill.energyCost} energy for ${currentSkill.name}, remaining: ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);

        // Initialize damage tracking
        const damageDealt = new Map<string, number>();

        // Special handling for Rescue skill - teleports ally to safety
        if (currentSkill?.id === 'rescue') {
            console.log(`🚑 ${selectedUnit.name} is attempting to rescue a unit at (${targetPosition.x}, ${targetPosition.y})`);
            
            // Find the target unit at the selected position
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Rescue skill at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            
            // Check if target is an ally (same team)
            if (targetUnit.team !== selectedUnit.team) {
                console.warn(`❌ Cannot rescue enemy unit ${targetUnit.name}`);
                return null;
            }
            
            // Get caster's position
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn(`❌ Could not determine caster position for Rescue skill`);
                return null;
            }
            
            // Check if target is within range 3
            const distance = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (distance > 3) {
                console.warn(`❌ Target is too far for Rescue skill (distance: ${distance}, max: 3)`);
                return null;
            }
            
            // Check if target is at the excluded tile (1 south of caster)
            const excludedTileX = casterPosition.x;
            const excludedTileY = casterPosition.y + 1;
            if (targetPosition.x === excludedTileX && targetPosition.y === excludedTileY) {
                console.warn(`❌ Cannot target the tile 1 south of caster for Rescue skill`);
                return null;
            }
            
            // Calculate destination (1 south of caster)
            const destinationX = casterPosition.x;
            const destinationY = casterPosition.y + 1;
            
            // Check if destination is within map bounds
            if (destinationX < 0 || destinationX >= 8 || destinationY < 0 || destinationY >= 8) {
                console.warn(`❌ Rescue destination (${destinationX}, ${destinationY}) is out of bounds`);
                return null;
            }
            
            // Check if destination is unoccupied
            const unitAtDestination = getUnitAtPosition(destinationX, destinationY);
            if (unitAtDestination) {
                console.warn(`❌ Rescue destination (${destinationX}, ${destinationY}) is occupied by ${unitAtDestination.name}`);
                return null;
            }
            
            // Perform the rescue teleportation
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                // Update target unit's position using the correct method
                gameSceneInstance.unitRenderer.moveUnitToPosition(targetUnit, { x: destinationX, y: destinationY });
                console.log(`🚑 ${selectedUnit.name} successfully rescued ${targetUnit.name} to (${destinationX}, ${destinationY})`);
                
                // Update visual elements
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
            }
            
            return {
                success: true,
                affectedUnits: [selectedUnit, targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Teleport skill
        if (currentSkill?.id === 'teleport') {
            // Teleport uses movement system directly, different handling
            console.log(`🌀 ${selectedUnit.name} teleports to (${targetPosition.x}, ${targetPosition.y})`);
            
            return {
                success: true,
                affectedUnits: [selectedUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Get Sturdy skill - applies Sturdy modifiers to self and optionally an ally
        if (currentSkill?.id === 'get-sturdy') {
            console.log(`🛡️ ${selectedUnit.name} is getting sturdy!`);
            
            const affectedUnits: Unit[] = [selectedUnit];
            
            // Always apply 2 stacks of Sturdy to the caster
            ModifierService.applyModifier(selectedUnit, 'STURDY', 2, selectedUnit.id);
            console.log(`🛡️ ${selectedUnit.name} gained 2 stacks of Sturdy`);
            
            // Check if there's a target unit at the selected position
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            
            if (targetUnit && targetUnit.id !== selectedUnit.id) {
                // Check if target is an ally (same team)
                if (targetUnit.team === selectedUnit.team) {
                    // Apply 2 stacks of Sturdy to the ally as well
                    ModifierService.applyModifier(targetUnit, 'STURDY', 2, selectedUnit.id);
                    affectedUnits.push(targetUnit);
                    console.log(`🛡️ ${targetUnit.name} also gained 2 stacks of Sturdy from ${selectedUnit.name}`);
                } else {
                    console.warn(`❌ Cannot apply Get Sturdy to enemy unit ${targetUnit.name}`);
                }
            }
            
            // Update visual modifier indicators for all affected units
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affectedUnits.forEach(unit => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                    console.log(`🏷️ Updated visual modifiers for ${unit.name} after Get Sturdy`);
                });
                
                // Force a render update
                setTimeout(() => {
                    affectedUnits.forEach(unit => {
                        gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                    });
                    console.log(`🔄 Delayed visual modifier update for Get Sturdy affected units`);
                }, 100);
            }
            
            console.log(`🛡️ Get Sturdy completed - affected ${affectedUnits.length} unit(s)`);
            
            return {
                success: true,
                affectedUnits,
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Prepare skill - applies modifiers
        if (currentSkill?.id === 'prepare') {
            // Apply 1 stack of Strength and 1 stack of Sturdy to self
            ModifierService.applyModifier(selectedUnit, 'STRENGTH', 1, selectedUnit.id);
            ModifierService.applyModifier(selectedUnit, 'STURDY', 1, selectedUnit.id);
            
            // Update visual modifier indicators with more debugging
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                console.log(`🔍 Updating visual modifiers for ${selectedUnit.name} - current modifiers:`, selectedUnit.activeModifiers.length);
                gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
                console.log(`🏷️ Updated visual modifiers for ${selectedUnit.name} after Prepare`);
                
                // Force a render update
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
                    console.log(`🔄 Delayed visual modifier update for ${selectedUnit.name}`);
                }, 100);
            }
            
            console.log(`🛡️ ${selectedUnit.name} prepared themselves with Strength and Sturdy modifiers`);
            
            return {
                success: true,
                affectedUnits: [selectedUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Zero In skill - applies Focus and Strength to self
        if (currentSkill?.id === 'zero-in') {
            // Apply 1 stack of Focus and 1 stack of Strength to self
            ModifierService.applyModifier(selectedUnit, 'FOCUS', 1, selectedUnit.id);
            ModifierService.applyModifier(selectedUnit, 'STRENGTH', 1, selectedUnit.id);

            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
                }, 100);
            }

            console.log(`🎯 ${selectedUnit.name} zeroed in and gained Focus and Strength`);

            return {
                success: true,
                affectedUnits: [selectedUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Divination - applies Focus and Charge to self
        if (currentSkill?.id === 'divination') {
            // Apply 1 Focus and 5 Charge to self
            ModifierService.applyModifier(selectedUnit, 'FOCUS', 1, selectedUnit.id);
            ModifierService.applyModifier(selectedUnit, 'CHARGE', 5, selectedUnit.id);

            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
                }, 100);
            }

            console.log(`🔮 ${selectedUnit.name} used Divination: +1 Focus, +5 Charge`);

            return {
                success: true,
                affectedUnits: [selectedUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Exhaust skill - applies debuff modifiers
        if (currentSkill?.id === 'exhaust') {
            // Find the target unit at the selected position
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Exhaust skill at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            
            console.log(`🎯 Exhaust targeting: ${targetUnit.name} (${targetUnit.team}) at (${targetPosition.x}, ${targetPosition.y})`);
            
            // Check if target is an enemy
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Exhaust on allied unit ${targetUnit.name}. Exhaust can only target enemy units.`);
                return null;
            }
            
            // Apply the three debuff modifiers
            ModifierService.applyModifier(targetUnit, 'WEAK', 1, selectedUnit.id);
            ModifierService.applyModifier(targetUnit, 'SLOW', 1, selectedUnit.id);
            ModifierService.applyModifier(targetUnit, 'TIRED', 1, selectedUnit.id);
            
            // Update visual modifier indicators with more debugging
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                console.log(`🔍 Updating visual modifiers for ${targetUnit.name} - current modifiers:`, targetUnit.activeModifiers.length);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                console.log(`🏷️ Updated visual modifiers for ${targetUnit.name} after Exhaust`);
                
                // Force a render update
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    console.log(`🔄 Delayed visual modifier update for ${targetUnit.name}`);
                }, 100);
            }
            
            console.log(`😴 ${selectedUnit.name} exhausted ${targetUnit.name} - applied Weak, Slow, and Tired!`);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Taunt skill - applies Anger modifier to enemy units
        if (currentSkill?.id === 'taunt') {
            // Find the target unit at the selected position
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Taunt skill at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            
            console.log(`🎯 Taunt targeting: ${targetUnit.name} (${targetUnit.team}) at (${targetPosition.x}, ${targetPosition.y})`);
            
            // Check if target is an enemy
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Taunt on allied unit ${targetUnit.name}. Taunt can only target enemy units.`);
                return null;
            }
            
            // Apply 5 stacks of Anger modifier
            ModifierService.applyModifier(targetUnit, 'ANGER', 5, selectedUnit.id);
            
            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                console.log(`🔍 Updating visual modifiers for ${targetUnit.name} - current modifiers:`, targetUnit.activeModifiers.length);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                console.log(`🏷️ Updated visual modifiers for ${targetUnit.name} after Taunt`);
                
                // Force a render update
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    console.log(`🔄 Delayed visual modifier update for ${targetUnit.name}`);
                }, 100);
            }
            
            console.log(`😡 ${selectedUnit.name} taunted ${targetUnit.name}, applying 5 stacks of Anger`);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Jeer skill - applies debuff modifiers
        if (currentSkill?.id === 'jeer') {
            // Find the target unit at the selected position
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Jeer skill at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            
            console.log(`🎯 Jeer targeting: ${targetUnit.name} (${targetUnit.team}) at (${targetPosition.x}, ${targetPosition.y})`);
            
            // Check if target is an enemy
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Jeer on allied unit ${targetUnit.name}. Jeer can only target enemy units.`);
                return null;
            }
            
            // Apply the two debuff modifiers with 3 stacks each
            ModifierService.applyModifier(targetUnit, 'EXPOSED', 3, selectedUnit.id);
            ModifierService.applyModifier(targetUnit, 'WEAK', 3, selectedUnit.id);
            
            // Update visual modifier indicators with more debugging
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                console.log(`🔍 Updating visual modifiers for ${targetUnit.name} - current modifiers:`, targetUnit.activeModifiers.length);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                console.log(`🏷️ Updated visual modifiers for ${targetUnit.name} after Jeer`);
                
                // Force a render update
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    console.log(`🔄 Delayed visual modifier update for ${targetUnit.name}`);
                }, 100);
            }
            
            console.log(`😈 ${selectedUnit.name} jeered at ${targetUnit.name}, applying Exposed and Weak modifiers`);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Distraction - applies Exposed and Confusion
        if (currentSkill?.id === 'distraction') {
            // Find the target unit at the selected position
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Distraction at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            
            console.log(`🎯 Distraction targeting: ${targetUnit.name} (${targetUnit.team}) at (${targetPosition.x}, ${targetPosition.y})`);
            
            // Check if target is an enemy
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Distraction on allied unit ${targetUnit.name}. Distraction can only target enemy units.`);
                return null;
            }
            
            // Apply 2 Exposed and 2 Confusion
            ModifierService.applyModifier(targetUnit, 'EXPOSED', 2, selectedUnit.id);
            ModifierService.applyModifier(targetUnit, 'CONFUSION', 2, selectedUnit.id);
            
            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
            }
            
            // Process post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);
            
            console.log(`🌀 ${selectedUnit.name} used Distraction on ${targetUnit.name}, applying Exposed and Confusion.`);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Lead The Charge skill - buffs adjacent allies and performs leap
        if (currentSkill?.id === 'lead-the-charge') {
            console.log(`🏃 ${selectedUnit.name} is leading the charge!`);
            
            // Get the caster's current position
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn(`❌ Cannot determine ${selectedUnit.name}'s current position for Lead The Charge`);
                return null;
            }
            
            // Find all adjacent allied units (both cardinal and diagonal)
            const adjacentAllies: Unit[] = [];
            const adjacentOffsets = [
                { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, // Top row
                { x: -1, y: 0 },                   { x: 1, y: 0 },  // Middle row (excluding center)
                { x: -1, y: 1 },  { x: 0, y: 1 },  { x: 1, y: 1 }   // Bottom row
            ];
            
            for (const offset of adjacentOffsets) {
                const checkX = casterPosition.x + offset.x;
                const checkY = casterPosition.y + offset.y;
                const adjacentUnit = getUnitAtPosition(checkX, checkY);
                
                if (adjacentUnit && adjacentUnit.team === selectedUnit.team && adjacentUnit.id !== selectedUnit.id) {
                    adjacentAllies.push(adjacentUnit);
                    console.log(`⚡ Found adjacent ally: ${adjacentUnit.name} at (${checkX}, ${checkY})`);
                }
            }
            
            // Apply 4 Charge to all adjacent allies
            adjacentAllies.forEach(ally => {
                ModifierService.applyModifier(ally, 'CHARGE', 4, selectedUnit.id);
                console.log(`⚡ Applied 4 Charge to ${ally.name}`);
            });
            
            // Update visual modifiers for all affected allies
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                adjacentAllies.forEach(ally => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(ally);
                });
            }
            
            console.log(`🏃 ${selectedUnit.name} completed Lead The Charge buffing - charged ${adjacentAllies.length} allies. Leap movement will be handled by targeting system.`);
            
            return {
                success: true,
                affectedUnits: [selectedUnit, ...adjacentAllies],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Rally skill - restores energy to adjacent allies
        if (currentSkill?.id === 'rally') {
            console.log(`📢 ${selectedUnit.name} is rallying allies!`);
            
            // For self-targeting Rally skill, the target position is the caster's position
            const casterPosition = targetPosition;
            
            // Find all adjacent allied units (both cardinal and diagonal)
            const adjacentAllies: Unit[] = [];
            const adjacentOffsets = [
                { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, // Top row
                { x: -1, y: 0 },                   { x: 1, y: 0 },  // Middle row (excluding center)
                { x: -1, y: 1 },  { x: 0, y: 1 },  { x: 1, y: 1 }   // Bottom row
            ];
            
            for (const offset of adjacentOffsets) {
                const checkX = casterPosition.x + offset.x;
                const checkY = casterPosition.y + offset.y;
                const adjacentUnit = getUnitAtPosition(checkX, checkY);
                
                if (adjacentUnit && adjacentUnit.team === selectedUnit.team && adjacentUnit.id !== selectedUnit.id) {
                    adjacentAllies.push(adjacentUnit);
                    console.log(`⚡ Found adjacent ally: ${adjacentUnit.name} at (${checkX}, ${checkY})`);
                }
            }
            
            // Restore 3 energy to all adjacent allies
            const energyRestored = 3;
            adjacentAllies.forEach(ally => {
                const oldEnergy = ally.currentEnergy;
                ally.currentEnergy = Math.min(ally.maxEnergy, ally.currentEnergy + energyRestored);
                const newEnergy = ally.currentEnergy;
                console.log(`⚡ ${ally.name} energy restored: ${oldEnergy} → ${newEnergy}/${ally.maxEnergy} (+${newEnergy - oldEnergy})`);
            });
            
            // Update visual energy bars for all affected allies
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                adjacentAllies.forEach(ally => {
                    gameSceneInstance.unitRenderer.updateUnitBars(ally);
                });
            }
            
            console.log(`📢 ${selectedUnit.name} completed Rally - restored energy to ${adjacentAllies.length} allies.`);
            
            return {
                success: true,
                affectedUnits: [selectedUnit, ...adjacentAllies],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Flare Shot skill - deals damage and applies Burn
        // Special handling for Glitch Strike - damage target and apply Glitched to both target and self
        if (currentSkill?.id === 'glitch-strike') {
            // Find the target unit at the selected position
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);

            if (!targetUnit) {
                console.warn(`❌ No target unit found for Glitch Strike at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }

            console.log(`🎯 Glitch Strike targeting: ${targetUnit.name} (${targetUnit.team}) at (${targetPosition.x}, ${targetPosition.y})`);

            // Check if target is an enemy
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Glitch Strike on allied unit ${targetUnit.name}. Glitch Strike can only target enemy units.`);
                return null;
            }

            // Process skill damage with modifiers
            const baseDamage = totalSkillDamage; // includes +1 from bonusDamage
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            console.log(`⚡ Glitch Strike base damage: ${baseDamage}, Modified damage: ${attackResult.finalDamage}`);

            // Process defender modifiers
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;
            console.log(`🛡️ Final damage after defense modifiers: ${finalDamage}`);

            // Apply final damage
            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            const newHealth = targetUnit.currentHealth;
            console.log(`⚡ ${targetUnit.name} takes ${finalDamage} damage from Glitch Strike: ${oldHealth} → ${newHealth}/${targetUnit.health}`);

            // Track final damage for animation
            const damageDealt = new Map<string, number>();
            damageDealt.set(targetUnit.id, finalDamage);

            // Apply 1 Glitched to the enemy and 1 Glitched to self
            ModifierService.applyModifier(targetUnit, 'GLITCHED', 1, selectedUnit.id);
            ModifierService.applyModifier(selectedUnit, 'GLITCHED', 1, selectedUnit.id);

            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
            }

            // Process post-skill passives before returning
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Flare Shot skill - deals damage and applies Burn
        if (currentSkill?.id === 'flare-shot') {
            // Find the target unit at the selected position
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Flare Shot skill at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            
            console.log(`🎯 Flare Shot targeting: ${targetUnit.name} (${targetUnit.team}) at (${targetPosition.x}, ${targetPosition.y})`);
            
            // Check if target is an enemy
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Flare Shot on allied unit ${targetUnit.name}. Flare Shot can only target enemy units.`);
                return null;
            }
            
            // Process skill damage with modifiers
            const baseDamage = totalSkillDamage;
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            console.log(`🔥 Base damage: ${baseDamage}, Modified damage: ${attackResult.finalDamage}`);
            if (attackResult.triggeredModifiers.length > 0) {
                console.log(`🔥 Attacker modifiers triggered: ${attackResult.triggeredModifiers.join(', ')}`);
            }
            
            // Process defender modifiers
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;
            console.log(`🛡️ Final damage after defense modifiers: ${finalDamage}`);
            if (defenseResult.triggeredModifiers.length > 0) {
                console.log(`🔥 Defender modifiers triggered: ${defenseResult.triggeredModifiers.join(', ')}`);
            }
            
            // Apply final damage
            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            
            // Lucky Rabbit Foot check
            if (targetUnit.currentHealth <= 0) {
                PassiveService.tryPreventLethalWithLuckyFoot(targetUnit);
            }
            const newHealth = targetUnit.currentHealth;
            console.log(`🔥 ${targetUnit.name} takes ${finalDamage} damage from Flare Shot: ${oldHealth} → ${newHealth}/${targetUnit.health}`);
            
            // Track final damage for animation
            damageDealt.set(targetUnit.id, finalDamage);
            
            // Apply 3 stacks of Burn
            ModifierService.applyModifier(targetUnit, 'BURN', 3, selectedUnit.id);
            
            // Update visual modifier indicators with more debugging
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                console.log(`🔍 Updating visual modifiers for ${targetUnit.name} - current modifiers:`, targetUnit.activeModifiers.length);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                console.log(`🏷️ Updated visual modifiers for ${targetUnit.name} after Flare Shot`);
                
                // Force a render update
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    console.log(`🔄 Delayed visual modifier update for ${targetUnit.name}`);
                }, 100);
            }
            
            console.log(`🔥 ${selectedUnit.name} hit ${targetUnit.name} with Flare Shot - dealt ${finalDamage} damage and applied 3 Burn!`);
            
            // Process post-skill passives before returning
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Flare Up - apply 3 Burn to an enemy within range (no direct damage)
        if (currentSkill?.id === 'flare-up') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Flare Up at (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Flare Up on allies.`);
                return null;
            }

            // Apply 3 Burn
            ModifierService.applyModifier(targetUnit, 'BURN', 3, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt: undefined
            };
        }

        // Special handling for Splash skill - deals damage and applies Wet
        if (currentSkill?.id === 'splash') {
            // Find the target unit at the selected position
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Splash skill at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            
            console.log(`🎯 Splash targeting: ${targetUnit.name} (${targetUnit.team}) at (${targetPosition.x}, ${targetPosition.y})`);
            
            // Check if target is an enemy
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Splash on allied unit ${targetUnit.name}. Splash can only target enemy units.`);
                return null;
            }
            
            // Process skill damage with modifiers
            const baseDamage = totalSkillDamage;
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            console.log(`💧 Base damage: ${baseDamage}, Modified damage: ${attackResult.finalDamage}`);
            if (attackResult.triggeredModifiers.length > 0) {
                console.log(`💧 Attacker modifiers triggered: ${attackResult.triggeredModifiers.join(', ')}`);
            }
            
            // Process defender modifiers
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;
            console.log(`🛡️ Final damage after defense modifiers: ${finalDamage}`);
            if (defenseResult.triggeredModifiers.length > 0) {
                console.log(`💧 Defender modifiers triggered: ${defenseResult.triggeredModifiers.join(', ')}`);
            }
            
            // Apply final damage
            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            const newHealth = targetUnit.currentHealth;
            console.log(`💧 ${targetUnit.name} takes ${finalDamage} damage from Splash: ${oldHealth} → ${newHealth}/${targetUnit.health}`);
            
            // Track final damage for animation
            damageDealt.set(targetUnit.id, finalDamage);
            
            // Apply 2 stacks of Wet
            ModifierService.applyModifier(targetUnit, 'WET', 2, selectedUnit.id);
            
            // Update visual modifier indicators with more debugging
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                console.log(`🔍 Updating visual modifiers for ${targetUnit.name} - current modifiers:`, targetUnit.activeModifiers.length);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                console.log(`🏷️ Updated visual modifiers for ${targetUnit.name} after Splash`);
                
                // Force a render update
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    console.log(`🔄 Delayed visual modifier update for ${targetUnit.name}`);
                }, 100);
            }
            
            console.log(`💧 ${selectedUnit.name} hit ${targetUnit.name} with Splash - dealt ${finalDamage} damage and applied 2 Wet!`);
            
            // Process post-skill passives before returning
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Poison Dart - deals damage and applies Toxicity
        if (currentSkill?.id === 'poison-dart') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Poison Dart at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }

            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Poison Dart on allied unit ${targetUnit.name}.`);
                return null;
            }

            // Damage calculation (Skill Damage + 2)
            const baseDamage = totalSkillDamage;
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;

            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            const damageDealt = new Map<string, number>();
            damageDealt.set(targetUnit.id, finalDamage);

            // Apply 2 Toxicity stacks
            ModifierService.applyModifier(targetUnit, 'TOXICITY', 2, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            console.log(`🧪 ${targetUnit.name} takes ${finalDamage} from Poison Dart (was ${oldHealth}) and gains 2 Toxicity.`);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Aim Low - deals damage and applies Slow to a target exactly range 3
        if (currentSkill?.id === 'aim-low') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Aim Low at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }

            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Aim Low on allied unit ${targetUnit.name}.`);
                return null;
            }

            // Damage calculation (Skill Damage + 2)
            const baseDamage = totalSkillDamage; // includes +2 from bonusDamage
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;

            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            const damageDealt = new Map<string, number>();
            damageDealt.set(targetUnit.id, finalDamage);

            // Apply 2 Slow stacks
            ModifierService.applyModifier(targetUnit, 'SLOW', 2, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            console.log(`🦵 ${targetUnit.name} takes ${finalDamage} from Aim Low (was ${oldHealth}) and gains 2 Slow.`);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Disarming Slash - deals damage and applies Weak
        if (currentSkill?.id === 'disarming-slash') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Disarming Slash at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }

            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Disarming Slash on allied unit ${targetUnit.name}.`);
                return null;
            }

            // Damage calculation
            const baseDamage = totalSkillDamage; // includes +2 from bonusDamage
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;

            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            console.log(`🗡️ ${targetUnit.name} takes ${finalDamage} damage from Disarming Slash: ${oldHealth} → ${targetUnit.currentHealth}/${targetUnit.health}`);

            const damageDealt = new Map<string, number>();
            damageDealt.set(targetUnit.id, finalDamage);

            // Apply 2 Weak stacks
            ModifierService.applyModifier(targetUnit, 'WEAK', 2, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Forceful Strike - damage, push 1 tile, apply 1 Exposed
        if (currentSkill?.id === 'forceful-strike') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Forceful Strike at (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }

            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Forceful Strike on allied unit ${targetUnit.name}.`);
                return null;
            }

            // Damage calculation (Skill Damage + 1)
            const baseDamage = totalSkillDamage; // includes +1 from bonusDamage
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;

            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            console.log(`💥 ${targetUnit.name} takes ${finalDamage} damage from Forceful Strike: ${oldHealth} → ${targetUnit.currentHealth}/${targetUnit.health}`);

            const damageDealt = new Map<string, number>();
            damageDealt.set(targetUnit.id, finalDamage);

            // Push the target back 1 tile, away from caster
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (casterPosition) {
                const deltaX = targetPosition.x - casterPosition.x;
                const deltaY = targetPosition.y - casterPosition.y;
                const stepX = Math.sign(deltaX);
                const stepY = Math.sign(deltaY);
                const destination = { x: targetPosition.x + stepX, y: targetPosition.y + stepY };
                if (
                    destination.x >= 0 && destination.x < 8 &&
                    destination.y >= 0 && destination.y < 8 &&
                    !getUnitAtPosition(destination.x, destination.y)
                ) {
                    const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                    if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                        gameSceneInstance.unitRenderer.moveUnitToPosition(targetUnit, destination);
                        console.log(`🌪️ Forceful Strike pushed ${targetUnit.name} to (${destination.x}, ${destination.y})`);
                    }
                } else {
                    console.log(`🚫 Forceful Strike push blocked for ${targetUnit.name}`);
                }
            }

            // Apply 1 Exposed
            ModifierService.applyModifier(targetUnit, 'EXPOSED', 1, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Back Off - push target 2 tiles away and apply 1 Slow
        if (currentSkill?.id === 'back-off') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Back Off at (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }

            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Back Off on allied unit ${targetUnit.name}.`);
                return null;
            }

            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;

            // Check adjacency (range 1)
            const manhattan = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (manhattan !== 1) {
                console.warn('❌ Back Off requires adjacent target (range 1)');
                return null;
            }

            // Compute push vector (away from caster) and attempt to move 2 tiles
            const stepX = Math.sign(targetPosition.x - casterPosition.x);
            const stepY = Math.sign(targetPosition.y - casterPosition.y);
            const destination = { x: targetPosition.x + 2 * stepX, y: targetPosition.y + 2 * stepY };

            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                // Validate path: ensure both intermediate and final tiles are in bounds and unoccupied
                const mid = { x: targetPosition.x + stepX, y: targetPosition.y + stepY };
                const inBounds = (p: { x: number; y: number }) => p.x >= 0 && p.x < 8 && p.y >= 0 && p.y < 8;
                const empty = (p: { x: number; y: number }) => !getUnitAtPosition(p.x, p.y);
                if (inBounds(mid) && inBounds(destination) && empty(mid) && empty(destination)) {
                    gameSceneInstance.unitRenderer.moveUnitToPosition(targetUnit, destination);
                    console.log(`📢 Back Off pushed ${targetUnit.name} to (${destination.x}, ${destination.y})`);
                } else if (inBounds(mid) && empty(mid)) {
                    // Push only 1 if blocked on the second tile
                    gameSceneInstance.unitRenderer.moveUnitToPosition(targetUnit, mid);
                    console.log(`📢 Back Off partially pushed ${targetUnit.name} to (${mid.x}, ${mid.y})`);
                } else {
                    console.log(`🚫 Back Off push blocked for ${targetUnit.name}`);
                }
            }

            // Apply 1 Slow
            ModifierService.applyModifier(targetUnit, 'SLOW', 1, selectedUnit.id);

            // Update visuals
            const gs = (window as any).GAME_SCENE_INSTANCE;
            if (gs && gs.unitRenderer) {
                gs.unitRenderer.updateUnitModifiers(targetUnit);
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }
        // Special handling for Lifeblade - melee damage and apply 8 Leech
        if (currentSkill?.id === 'lifeblade') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Lifeblade at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }

            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Lifeblade on allied unit ${targetUnit.name}.`);
                return null;
            }

            // Melee range check (range 1)
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;
            const manhattan = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (manhattan !== 1) {
                console.warn('❌ Lifeblade requires adjacent target (range 1)');
                return null;
            }

            // Damage calculation (Skill Damage + 3)
            const baseDamage = totalSkillDamage;
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;

            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            console.log(`❤️‍🔥 ${targetUnit.name} takes ${finalDamage} damage from Lifeblade: ${oldHealth} → ${targetUnit.currentHealth}/${targetUnit.health}`);

            const damageDealt = new Map<string, number>();
            damageDealt.set(targetUnit.id, finalDamage);

            // Apply 8 Leech to the target
            ModifierService.applyModifier(targetUnit, 'LEECH', 8, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Drain Punch - melee damage then apply Leech and Sap
        if (currentSkill?.id === 'drain-punch') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Drain Punch at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }

            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Drain Punch on allied unit ${targetUnit.name}.`);
                return null;
            }

            // Melee range check (range 1)
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;
            const manhattan = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (manhattan !== 1) {
                console.warn('❌ Drain Punch requires adjacent target (range 1)');
                return null;
            }

            // Damage calculation (Skill Damage - 1)
            const baseDamage = totalSkillDamage; // includes -1 from bonusDamage
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;

            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            console.log(`🥊 ${targetUnit.name} takes ${finalDamage} damage from Drain Punch: ${oldHealth} → ${targetUnit.currentHealth}/${targetUnit.health}`);

            damageDealt.set(targetUnit.id, finalDamage);

            // Apply 3 Leech and 3 Sap to the target
            ModifierService.applyModifier(targetUnit, 'LEECH', 3, selectedUnit.id);
            ModifierService.applyModifier(targetUnit, 'SAP', 3, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Toxic King - place toxic tiles around target (including under) and around self (excluding under self)
        if (currentSkill?.id === 'toxic-king') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Toxic King at (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }

            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Toxic King must target an enemy unit.`);
                return null;
            }

            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!gameSceneInstance || !casterPos) return null;

            // 8-way adjacency offsets plus center
            const adjOffsets = [
                { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
                { dx: -1, dy: 0 },  { dx: 0, dy: 0 },  { dx: 1, dy: 0 },
                { dx: -1, dy: 1 },  { dx: 0, dy: 1 },  { dx: 1, dy: 1 },
            ];

            // Around target: include center
            adjOffsets.forEach(({ dx, dy }) => {
                const x = targetPosition.x + dx;
                const y = targetPosition.y + dy;
                if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                    globalTileEffectManager.addEffect('toxic-tile', { x, y }, -1, selectedUnit.id);
                }
            });

            // Around self: exclude center (caster tile)
            const selfAdj = [
                { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
                { dx: -1, dy: 0 },                    { dx: 1, dy: 0 },
                { dx: -1, dy: 1 },  { dx: 0, dy: 1 },  { dx: 1, dy: 1 },
            ];
            selfAdj.forEach(({ dx, dy }) => {
                const x = casterPos.x + dx;
                const y = casterPos.y + dy;
                if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                    globalTileEffectManager.addEffect('toxic-tile', { x, y }, -1, selectedUnit.id);
                }
            });

            // Update tile visuals
            if (globalTileEffectRenderer) {
                globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
            }

            console.log(`☣️ ${selectedUnit.name} used Toxic King around ${targetUnit.name} at (${targetPosition.x}, ${targetPosition.y}) and around self at (${casterPos.x}, ${casterPos.y})`);

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Psyche Break - apply Headache, Confusion, Doubt within range 2
        if (currentSkill?.id === 'psyche-break') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Psyche Break at (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Psyche Break can only target enemies.`);
                return null;
            }
            const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPos) return null;
            const dist = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
            if (dist > 2) {
                console.warn('❌ Psyche Break requires target within range 2');
                return null;
            }

            ModifierService.applyModifier(targetUnit, 'HEADACHE', 4, selectedUnit.id);
            ModifierService.applyModifier(targetUnit, 'CONFUSION', 4, selectedUnit.id);
            ModifierService.applyModifier(targetUnit, 'DOUBT', 4, selectedUnit.id);

            const gs = (window as any).GAME_SCENE_INSTANCE;
            if (gs && gs.unitRenderer) {
                gs.unitRenderer.updateUnitModifiers(targetUnit);
            }

            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Revenge - apply 4 Counter to self
        if (currentSkill?.id === 'revenge') {
            // Apply to caster
            ModifierService.applyModifier(selectedUnit, 'COUNTER', 4, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
                gameSceneInstance.unitRenderer.updateUnitBars(selectedUnit);
            }

            // Process post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [selectedUnit]);

            return {
                success: true,
                affectedUnits: [selectedUnit],
                skill: currentSkill,
            };
        }

        // Special handling for Inspiring Slash - damage target and buff adjacent allies
        if (currentSkill?.id === 'inspiring-slash') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Inspiring Slash at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }

            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Inspiring Slash on allied unit ${targetUnit.name}.`);
                return null;
            }

            // Damage calculation
            const baseDamage = totalSkillDamage; // includes +3 from bonusDamage
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;

            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            console.log(`⚔️ ${targetUnit.name} takes ${finalDamage} damage from Inspiring Slash: ${oldHealth} → ${targetUnit.currentHealth}/${targetUnit.health}`);

            const damageDealt = new Map<string, number>();
            damageDealt.set(targetUnit.id, finalDamage);

            // Buff adjacent allies around the caster (8-way)
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const affectedAllies: Unit[] = [];
            if (gameSceneInstance && gameSceneInstance.unitRenderer && getUnitPosition) {
                const casterPos = getUnitPosition(selectedUnit);
                if (casterPos) {
                    const adjacentOffsets = [
                        { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
                        { x: -1, y: 0 },                    { x: 1, y: 0 },
                        { x: -1, y: 1 },  { x: 0, y: 1 },  { x: 1, y: 1 },
                    ];
                    for (const off of adjacentOffsets) {
                        const ax = casterPos.x + off.x;
                        const ay = casterPos.y + off.y;
                        if (ax < 0 || ax >= 8 || ay < 0 || ay >= 8) continue;
                        const unitAt = getUnitAtPosition(ax, ay);
                        if (unitAt && unitAt.team === selectedUnit.team && unitAt.id !== selectedUnit.id) {
                            ModifierService.applyModifier(unitAt, 'STRENGTH', 2, selectedUnit.id);
                            affectedAllies.push(unitAt);
                        }
                    }
                }
            }

            // Update visuals for target and allies
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                affectedAllies.forEach(u => gameSceneInstance.unitRenderer.updateUnitModifiers(u));
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit, ...affectedAllies]);

            return {
                success: true,
                affectedUnits: [targetUnit, ...affectedAllies],
                skill: currentSkill,
                damageDealt
            };
        }

        // Star's Blessing - apply 5 Blessed and 5 Faith to an allied unit within range 2 (can target self)
        if (currentSkill?.id === 'stars-blessing') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Star's Blessing at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            if (targetUnit.team !== selectedUnit.team) {
                console.warn(`❌ Star's Blessing can only target allies`);
                return null;
            }
            // Range validation: within 2
            const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPos) return null;
            const dist = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
            if (dist < 0 || dist > 2) {
                console.warn(`❌ Star's Blessing target out of range (range 2)`);
                return null;
            }
            // Apply buffs
            ModifierService.applyModifier(targetUnit, 'BLESSED', 5, selectedUnit.id);
            ModifierService.applyModifier(targetUnit, 'FAITH', 5, selectedUnit.id);
            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                // Show a non-damage buff animation explicitly to avoid damage popups
                if (gameSceneInstance.animationManager) {
                    gameSceneInstance.animationManager.showDebuffEffectAnimation(
                        targetUnit,
                        '⭐',
                        (unit: Unit) => gameSceneInstance.unitRenderer.getUnitPosition(unit),
                        (unit: Unit) => gameSceneInstance.unitRenderer.getUnitMesh(unit)
                    );
                }
            }
            // Post-skill passives (no damage), return success
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);
            return {
                success: true,
                affectedUnits: [],
                skill: currentSkill,
            };
        }

        // Aether's Grace - heal target ally in range 4 for (Skill Damage + 4), apply 4 Faith to it; apply 4 Blessed to self
        if (currentSkill?.id === 'aethers-grace') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Aether's Grace at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            if (targetUnit.team !== selectedUnit.team) {
                console.warn(`❌ Aether's Grace can only target allies`);
                return null;
            }
            // Range validation: within 4
            const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPos) return null;
            const dist = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
            if (dist < 0 || dist > 4) {
                console.warn(`❌ Aether's Grace target out of range (range 4)`);
                return null;
            }

            // Heal target
            // Base heal
            const baseHeal = selectedUnit.skillDamage + 4;
            // Apply healer-side modifiers (Faith/Doubt)
            const performHeal = ModifierService.processSkillHealPerformModifiers(selectedUnit, baseHeal);
            // Apply receiver-side modifiers (Blessed/Cursed)
            const receiveHeal = ModifierService.processSkillHealReceiveModifiers(targetUnit, performHeal.finalHealing, selectedUnit);
            const healAmount = receiveHeal.finalHealing;
            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.min(targetUnit.health, targetUnit.currentHealth + healAmount);
            console.log(`🕊️ Aether's Grace healed ${targetUnit.name} for ${healAmount}: ${oldHealth} → ${targetUnit.currentHealth}/${targetUnit.health}`);

            // Apply buffs
            ModifierService.applyModifier(targetUnit, 'FAITH', 4, selectedUnit.id);
            ModifierService.applyModifier(selectedUnit, 'BLESSED', 4, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
            }

            const damageDealt = new Map<string, number>();
            damageDealt.set(targetUnit.id, healAmount);

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Cauterize - heal an allied unit within range 2 for (Skill Damage)
        if (currentSkill?.id === 'cauterize') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Cauterize at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            if (targetUnit.team !== selectedUnit.team) {
                console.warn(`❌ Cannot use Cauterize on enemy unit ${targetUnit.name}.`);
                return null;
            }

            // Heal equals totalSkillDamage (unit.skillDamage + bonusDamage 0)
            // Base heal equals totalSkillDamage
            const baseHeal2 = totalSkillDamage;
            const performHeal2 = ModifierService.processSkillHealPerformModifiers(selectedUnit, baseHeal2);
            const receiveHeal2 = ModifierService.processSkillHealReceiveModifiers(targetUnit, performHeal2.finalHealing, selectedUnit);
            const healAmount = receiveHeal2.finalHealing;
            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.min(targetUnit.health, targetUnit.currentHealth + healAmount);
            const newHealth = targetUnit.currentHealth;
            console.log(`🩹 ${targetUnit.name} healed for ${healAmount} by Cauterize: ${oldHealth} → ${newHealth}/${targetUnit.health}`);

            // Update UI and show healing animation with +N
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                if (gameSceneInstance.animationManager) {
                    gameSceneInstance.animationManager.showHealingAnimation(
                        targetUnit,
                        healAmount,
                        '🩹',
                        (unit: Unit) => gameSceneInstance.unitRenderer.getUnitPosition(unit),
                        (unit: Unit) => gameSceneInstance.unitRenderer.getUnitMesh(unit)
                    );
                }
            }

            // Process post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
            };
        }

        // Purifying Hand - remove all modifiers from a target within range 1
        if (currentSkill?.id === 'purifying-hand') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Purifying Hand at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            // Ensure target is within range 1
            const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPos) return null;
            const dist = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
            if (dist !== 1) {
                console.warn('❌ Purifying Hand requires target at range 1');
                return null;
            }
            // Remove all modifiers
            targetUnit.activeModifiers = [];
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                // Show emoji-only effect for cleanse
                if (gameSceneInstance.animationManager) {
                    gameSceneInstance.animationManager.showDebuffEffectAnimation(
                        targetUnit,
                        '🧼',
                        (unit: Unit) => gameSceneInstance.unitRenderer.getUnitPosition(unit),
                        (unit: Unit) => gameSceneInstance.unitRenderer.getUnitMesh(unit)
                    );
                }
            }
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);
            return {
                success: true,
                affectedUnits: [],
                skill: currentSkill,
            };
        }

        // Special handling for Spark Lance skill - deals damage and applies Shocked
        if (currentSkill?.id === 'spark-lance') {
            // Find the target unit at the selected position
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Spark Lance skill at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            
            console.log(`🎯 Spark Lance targeting: ${targetUnit.name} (${targetUnit.team}) at (${targetPosition.x}, ${targetPosition.y})`);
            
            // Check if target is an enemy
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Spark Lance on allied unit ${targetUnit.name}. Spark Lance can only target enemy units.`);
                return null;
            }
            
            // Process skill damage with modifiers
            const baseDamage = totalSkillDamage;
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            console.log(`⚡ Base damage: ${baseDamage}, Modified damage: ${attackResult.finalDamage}`);
            if (attackResult.triggeredModifiers.length > 0) {
                console.log(`⚡ Attacker modifiers triggered: ${attackResult.triggeredModifiers.join(', ')}`);
            }
            
            // Process defender modifiers
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;
            console.log(`🛡️ Final damage after defense modifiers: ${finalDamage}`);
            if (defenseResult.triggeredModifiers.length > 0) {
                console.log(`⚡ Defender modifiers triggered: ${defenseResult.triggeredModifiers.join(', ')}`);
            }
            
            // Apply final damage
            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            const newHealth = targetUnit.currentHealth;
            console.log(`⚡ ${targetUnit.name} takes ${finalDamage} damage from Spark Lance: ${oldHealth} → ${newHealth}/${targetUnit.health}`);
            
            // Track final damage for animation
            damageDealt.set(targetUnit.id, finalDamage);
            
            // Apply 2 stacks of Shocked
            ModifierService.applyModifier(targetUnit, 'SHOCKED', 2, selectedUnit.id);
            
            // Update visual modifier indicators with more debugging
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                console.log(`🔍 Updating visual modifiers for ${targetUnit.name} - current modifiers:`, targetUnit.activeModifiers.length);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                console.log(`🏷️ Updated visual modifiers for ${targetUnit.name} after Spark Lance`);
                
                // Force a render update
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    console.log(`🔄 Delayed visual modifier update for ${targetUnit.name}`);
                }, 100);
            }
            
            console.log(`⚡ ${selectedUnit.name} hit ${targetUnit.name} with Spark Lance - dealt ${finalDamage} damage and applied 2 Shocked!`);
            
            // Process post-skill passives before returning
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Aim High - deals damage and applies Headache
        if (currentSkill?.id === 'aim-high') {
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) {
                console.warn(`❌ No target unit found for Aim High at position (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            if (targetUnit.team === selectedUnit.team) {
                console.warn(`❌ Cannot use Aim High on allied unit ${targetUnit.name}.`);
                return null;
            }

            // Damage calculation (Skill Damage + 2)
            const baseDamage = totalSkillDamage;
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;

            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            console.log(`🎯 ${targetUnit.name} takes ${finalDamage} damage from Aim High: ${oldHealth} → ${targetUnit.currentHealth}/${targetUnit.health}`);

            const damageDealt = new Map<string, number>();
            damageDealt.set(targetUnit.id, finalDamage);

            // Apply 2 Headache stacks
            ModifierService.applyModifier(targetUnit, 'HEADACHE', 2, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
            }

            // Post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);

            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Light's On skill - places spotlight tiles
        if (currentSkill?.id === 'lights-on') {
            // Get caster position to determine row orientation
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Light\'s On');
                return null;
            }
            
            const centerX = targetPosition.x;
            const centerY = targetPosition.y;
            
            // Determine row orientation based on caster to target direction
            const deltaX = centerX - casterPosition.x;
            const deltaY = centerY - casterPosition.y;
            
            let rowTiles: { x: number; y: number }[];
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Moving primarily horizontally (east/west) -> create vertical row
                rowTiles = [
                    { x: centerX, y: centerY - 1 }, // Top
                    { x: centerX, y: centerY },     // Center (target position)
                    { x: centerX, y: centerY + 1 }  // Bottom
                ];
                console.log(`🔍 Creating vertical spotlight row at (${centerX}, ${centerY}) - target is east/west of caster`);
            } else {
                // Moving primarily vertically (north/south) -> create horizontal row
                rowTiles = [
                    { x: centerX - 1, y: centerY }, // Left
                    { x: centerX, y: centerY },     // Center (target position)
                    { x: centerX + 1, y: centerY }  // Right
                ];
                console.log(`🔍 Creating horizontal spotlight row at (${centerX}, ${centerY}) - target is north/south of caster`);
            }
            
            rowTiles.forEach(tile => {
                // Check if tile is within map bounds
                if (tile.x >= 0 && tile.x < 8 && tile.y >= 0 && tile.y < 8) {
                    globalTileEffectManager.addEffect('spotlight', { x: tile.x, y: tile.y }, -1, selectedUnit.id);
                    console.log(`🔍 ${selectedUnit.name} placed a spotlight tile at (${tile.x}, ${tile.y})`);
                }
            });
            
            console.log(`🔍 ${selectedUnit.name} activated Light's On, placed ${rowTiles.length} spotlight tiles in a row centered at (${centerX}, ${centerY})`);
            
            // Update the visual tile effect renderer
            globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
            
            return {
                success: true,
                affectedUnits: [], // No units directly affected
                skill: currentSkill
            };
        }

        // Special handling for Perimeter - place a ring of spotlight tiles at range 4 from caster
        if (currentSkill?.id === 'perimeter') {
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Perimeter');
                return null;
            }

            const radius = 4;
            const ringTiles: { x: number; y: number }[] = [];
            // Manhattan ring: all tiles where |dx| + |dy| = radius
            for (let dx = -radius; dx <= radius; dx++) {
                const dyAbs = radius - Math.abs(dx);
                const candidates = [
                    { x: casterPosition.x + dx, y: casterPosition.y + dyAbs },
                    { x: casterPosition.x + dx, y: casterPosition.y - dyAbs },
                ];
                candidates.forEach(pos => {
                    if (pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8) {
                        ringTiles.push(pos);
                    }
                });
            }

            // Place spotlight tiles
            ringTiles.forEach(tile => {
                globalTileEffectManager.addEffect('spotlight', { x: tile.x, y: tile.y }, -1, selectedUnit.id);
            });
            globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);

            console.log(`🛡️ ${selectedUnit.name} created a Perimeter with ${ringTiles.length} spotlight tiles at range ${radius}`);

            return {
                success: true,
                affectedUnits: [],
                skill: currentSkill
            };
        }

        // Special handling for Hunker Down - apply Sturdy, Wish, and Charge to self
        if (currentSkill?.id === 'hunker-down') {
            // Apply modifiers to self
            ModifierService.applyModifier(selectedUnit, 'STURDY', 2, selectedUnit.id);
            ModifierService.applyModifier(selectedUnit, 'WISH', 6, selectedUnit.id);
            ModifierService.applyModifier(selectedUnit, 'CHARGE', 6, selectedUnit.id);

            // Update visual indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
                setTimeout(() => gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit), 100);
            }

            console.log(`🏠 ${selectedUnit.name} hunkered down: +2 Sturdy, +6 Wish, +6 Charge`);

            return {
                success: true,
                affectedUnits: [selectedUnit],
                skill: currentSkill
            };
        }

        // Special handling for Glass Floor skill - places glass tiles
        if (currentSkill?.id === 'glass-floor') {
            // Get caster position to determine forward direction
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Glass Floor');
                return null;
            }
            
            // For unit-rotational skills, we need to use the skill's getTargetPattern
            // with the caster position and rotation from action state
            const rotation = this.actionState.getSkillRotation();
            const targets = currentSkill.getTargetPattern(
                casterPosition.x, 
                casterPosition.y, 
                'north', // Default direction, rotation handles orientation 
                rotation
            );
            
            targets.forEach(target => {
                // Check if tile is within map bounds
                if (target.x >= 0 && target.x < 8 && target.y >= 0 && target.y < 8) {
                    globalTileEffectManager.addEffect('glass-tile', { x: target.x, y: target.y }, -1, selectedUnit.id);
                    console.log(`🪟 ${selectedUnit.name} placed a glass tile at (${target.x}, ${target.y})`);
                }
            });
            
            console.log(`🪟 ${selectedUnit.name} activated Glass Floor, placed ${targets.length} glass tiles in a forward line`);
            
            // Update the visual tile effect renderer
            globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
            
            return {
                success: true,
                affectedUnits: [], // No units directly affected
                skill: currentSkill
            };
        }

        // Comet Tail - apply 1 Slow to tiles 1 and 2 forward; deal damage (Skill Damage - 1) to tile 3
        if (currentSkill?.id === 'comet-tail') {
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Comet Tail');
                return null;
            }

            const rotation = this.actionState.getSkillRotation();
            const pattern = currentSkill.getTargetPattern(
                casterPosition.x,
                casterPosition.y,
                'north',
                rotation
            );

            const affectedUnits: Unit[] = [];
            const damageDealt = new Map<string, number>();

            // Positions: index 0 -> 1 away, index 1 -> 2 away, index 2 -> 3 away (isPrimary)
            pattern.forEach((pos, idx) => {
                const unitAt = getUnitAtPosition ? getUnitAtPosition(pos.x, pos.y) : null;
                if (!unitAt || unitAt.team === selectedUnit.team) return;
                if (idx === 2) {
                    // Deal damage to the 3-away target only
                    const baseDamage = totalSkillDamage; // includes -1 from bonusDamage
                    const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
                    const defenseResult = ModifierService.processSkillDamageDefenseModifiers(unitAt, attackResult.finalDamage, selectedUnit);
                    const finalDamage = defenseResult.finalDamage;
                    const oldHealth = unitAt.currentHealth;
                    unitAt.currentHealth = Math.max(0, unitAt.currentHealth - finalDamage);
                    console.log(`☄️ Comet Tail hits ${unitAt.name} for ${finalDamage}: ${oldHealth} → ${unitAt.currentHealth}/${unitAt.health}`);
                    affectedUnits.push(unitAt);
                    damageDealt.set(unitAt.id, finalDamage);
                } else {
                    // Apply 1 Slow (no number in animation; effect only)
                    ModifierService.applyModifier(unitAt, 'SLOW', 1, selectedUnit.id);
                    affectedUnits.push(unitAt);
                }
            });

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affectedUnits.forEach(u => {
                    gameSceneInstance.unitRenderer.updateUnitBars(u);
                    gameSceneInstance.unitRenderer.updateUnitModifiers(u);
                });
            }

            // For animation rendering: pass damageDealt so only the 3-away target shows a number
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affectedUnits);
            return {
                success: true,
                affectedUnits,
                skill: currentSkill,
                damageDealt
            };
        }

        // Special handling for Tracking Dart - apply 4 TIRED to first enemy in forward line
        if (currentSkill?.id === 'tracking-dart') {
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Tracking Dart');
                return null;
            }

            const rotation = this.actionState.getSkillRotation();
            const targets = currentSkill.getTargetPattern(
                casterPosition.x,
                casterPosition.y,
                'north',
                rotation
            );

            // Find first enemy unit along the line
            let firstEnemy: Unit | null = null;
            for (const t of targets) {
                const unitAt = getUnitAtPosition ? getUnitAtPosition(t.x, t.y) : null;
                if (unitAt && unitAt.team !== selectedUnit.team) {
                    firstEnemy = unitAt;
                    break;
                }
            }

            if (!firstEnemy) {
                console.log('🏹 Tracking Dart found no enemy along the line');
                return {
                    success: true,
                    affectedUnits: [],
                    skill: currentSkill
                };
            }

            // Apply debuff
            ModifierService.applyModifier(firstEnemy, 'TIRED', 4, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(firstEnemy);
                setTimeout(() => gameSceneInstance.unitRenderer.updateUnitModifiers(firstEnemy), 100);
            }

            console.log(`🏹 ${selectedUnit.name} used Tracking Dart on ${firstEnemy.name}, applying 4 Tired`);

            return {
                success: true,
                affectedUnits: [firstEnemy],
                skill: currentSkill
            };
        }

        // Special handling for Flashbang - apply Exposed and Confusion to all enemies in 3x3 area centered 3 away
        if (currentSkill?.id === 'flashbang') {
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Flashbang');
                return null;
            }

            const rotation = this.actionState.getSkillRotation();
            const pattern = currentSkill.getTargetPattern(
                casterPosition.x,
                casterPosition.y,
                'north',
                rotation
            );

            const affectedUnits: Unit[] = [];
            pattern.forEach(t => {
                const unitAt = getUnitAtPosition ? getUnitAtPosition(t.x, t.y) : null;
                if (unitAt && unitAt.team !== selectedUnit.team) {
                    ModifierService.applyModifier(unitAt, 'EXPOSED', 2, selectedUnit.id);
                    ModifierService.applyModifier(unitAt, 'CONFUSION', 2, selectedUnit.id);
                    affectedUnits.push(unitAt);
                }
            });

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affectedUnits.forEach(u => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(u);
                    setTimeout(() => gameSceneInstance.unitRenderer.updateUnitModifiers(u), 100);
                });
            }

            console.log(`⚡ ${selectedUnit.name} used Flashbang, affecting ${affectedUnits.length} enemies with Exposed and Confusion`);

            return {
                success: true,
                affectedUnits,
                skill: currentSkill
            };
        }

        // Special handling for Mist Spray skill - places random mist tiles
        if (currentSkill?.id === 'mist-spray') {
            console.log(`🌫️ ${selectedUnit.name} activated Mist Spray, placing 6 random mist tiles`);
            
            // Get all valid empty positions on the map (8x8 grid)
            const validPositions: { x: number; y: number }[] = [];
            
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    // Check if there's a unit at this position
                    const unitAtPosition = getUnitAtPosition ? getUnitAtPosition(x, y) : null;
                    if (!unitAtPosition) {
                        validPositions.push({ x, y });
                    }
                }
            }
            
            // Randomly select 6 positions from the valid positions
            const tilesPlaced = Math.min(6, validPositions.length);
            const selectedPositions: { x: number; y: number }[] = [];
            
            for (let i = 0; i < tilesPlaced; i++) {
                if (validPositions.length === 0) break;
                
                const randomIndex = Math.floor(Math.random() * validPositions.length);
                const selectedPosition = validPositions.splice(randomIndex, 1)[0];
                selectedPositions.push(selectedPosition);
                
                globalTileEffectManager.addEffect('mist-tile', selectedPosition, -1, selectedUnit.id);
                console.log(`🌫️ ${selectedUnit.name} placed a mist tile at (${selectedPosition.x}, ${selectedPosition.y})`);
            }
            
            console.log(`🌫️ ${selectedUnit.name} activated Mist Spray, placed ${tilesPlaced} mist tiles on random empty positions`);
            
            // Update the visual tile effect renderer
            globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
            
            return {
                success: true,
                affectedUnits: [], // No units directly affected
                skill: currentSkill
            };
        }

        // Special handling for Mistwalk - teleport to any mist tile created by this unit
        if (currentSkill?.id === 'mistwalk') {
            const destination = targetPosition;
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (!gameSceneInstance) return null;
            const currentPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!currentPos) return null;
            // Validate that destination is one of the caster's mist tiles
            // Access via window export from game.ts re-export
            const manager = (window as any).globalTileEffectManager;
            const effects: any[] = manager?.getEffectsAtPosition ? manager.getEffectsAtPosition(destination) : [];
            const isValid = effects.some((e: any) => e.effectId === 'mist-tile' && e.appliedBy === selectedUnit.id);
            if (!isValid) {
                console.warn('❌ Mistwalk target is not a mist tile created by this unit');
                return null;
            }
            // Teleport selectedUnit to destination
            const unitRenderer = gameSceneInstance.unitRenderer;
            if (unitRenderer && unitRenderer.moveUnitToPosition) {
                unitRenderer.moveUnitToPosition(selectedUnit, { x: destination.x, y: destination.y });
            } else if (unitRenderer && unitRenderer.setUnitPosition) {
                unitRenderer.setUnitPosition(selectedUnit, destination.x, destination.y);
            } else {
                // Fallback: update internal map
                try {
                    unitRenderer.placeUnit(selectedUnit, destination.x, destination.y);
                } catch {}
            }
            // Consume energy
            selectedUnit.currentEnergy = Math.max(0, selectedUnit.currentEnergy - currentSkill.energyCost);
            // Update visuals
            unitRenderer.updateUnitBars(selectedUnit);
            return {
                success: true,
                affectedUnits: [],
                skill: currentSkill,
                damageDealt: undefined
            };
        }

        // Special handling for Toxic Cloud skill - places toxic tiles
        if (currentSkill?.id === 'toxic-cloud') {
            // Get caster position to determine line orientation
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Toxic Cloud');
                return null;
            }
            
            const centerX = targetPosition.x;
            const centerY = targetPosition.y;
            
            // Determine line orientation based on caster to target direction
            const deltaX = centerX - casterPosition.x;
            const deltaY = centerY - casterPosition.y;
            
            let lineTiles: { x: number; y: number }[];
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Moving primarily horizontally (east/west) -> create vertical line
                lineTiles = [
                    { x: centerX, y: centerY - 1 }, // Top
                    { x: centerX, y: centerY },     // Center (target position)
                    { x: centerX, y: centerY + 1 }  // Bottom
                ];
                console.log(`☢️ Creating vertical toxic line at (${centerX}, ${centerY}) - target is east/west of caster`);
            } else {
                // Moving primarily vertically (north/south) -> create horizontal line
                lineTiles = [
                    { x: centerX - 1, y: centerY }, // Left
                    { x: centerX, y: centerY },     // Center (target position)
                    { x: centerX + 1, y: centerY }  // Right
                ];
                console.log(`☢️ Creating horizontal toxic line at (${centerX}, ${centerY}) - target is north/south of caster`);
            }
            
            lineTiles.forEach(tile => {
                // Check if tile is within map bounds
                if (tile.x >= 0 && tile.x < 8 && tile.y >= 0 && tile.y < 8) {
                    globalTileEffectManager.addEffect('toxic-tile', { x: tile.x, y: tile.y }, -1, selectedUnit.id);
                    console.log(`☢️ ${selectedUnit.name} placed a toxic tile at (${tile.x}, ${tile.y})`);
                }
            });
            
            console.log(`☢️ ${selectedUnit.name} activated Toxic Cloud, placed ${lineTiles.length} toxic tiles in a line centered at (${centerX}, ${centerY})`);
            
            // Update the visual tile effect renderer
            globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
            
            return {
                success: true,
                affectedUnits: [], // No units directly affected
                skill: currentSkill
            };
        }

        // Special handling for Smoke Grenade - place a smoke tile at target (range 3 handled by targeting)
        if (currentSkill?.id === 'smoke-grenade') {
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Smoke Grenade');
                return null;
            }
            // Validate any tile within range 3 (Manhattan distance 1..3)
            const manhattan = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (manhattan <= 0 || manhattan > 3) {
                console.warn(`❌ Smoke Grenade target out of range from (${casterPosition.x}, ${casterPosition.y}) to (${targetPosition.x}, ${targetPosition.y})`);
                return null;
            }
            // Ensure tile in bounds and unoccupied is NOT required (smoke can be on occupied tile)
            if (targetPosition.x >= 0 && targetPosition.x < 8 && targetPosition.y >= 0 && targetPosition.y < 8) {
                globalTileEffectManager.addEffect('smoke-tile', { x: targetPosition.x, y: targetPosition.y }, -1, selectedUnit.id);
                console.log(`💨 ${selectedUnit.name} placed a smoke tile at (${targetPosition.x}, ${targetPosition.y})`);
                globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
            }
            return {
                success: true,
                affectedUnits: [],
                skill: currentSkill,
            };
        }

        // Special handling for Outburst skill - damage and knockback all adjacent units
        if (currentSkill?.id === 'outburst') {
            console.log(`💥 Executing Outburst skill for ${selectedUnit.name}`);
            
            // Get caster position
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Outburst');
                return null;
            }
            
            // Define adjacent positions in clockwise order starting from north
            const adjacentPositions = [
                { x: casterPosition.x, y: casterPosition.y - 1, direction: 'north' },         // North
                { x: casterPosition.x + 1, y: casterPosition.y - 1, direction: 'northeast' }, // Northeast  
                { x: casterPosition.x + 1, y: casterPosition.y, direction: 'east' },         // East
                { x: casterPosition.x + 1, y: casterPosition.y + 1, direction: 'southeast' }, // Southeast
                { x: casterPosition.x, y: casterPosition.y + 1, direction: 'south' },         // South
                { x: casterPosition.x - 1, y: casterPosition.y + 1, direction: 'southwest' }, // Southwest
                { x: casterPosition.x - 1, y: casterPosition.y, direction: 'west' },         // West
                { x: casterPosition.x - 1, y: casterPosition.y - 1, direction: 'northwest' } // Northwest
            ];
            
            const outburstAffectedUnits: Unit[] = [];
            const outburstDamageDealt = new Map<string, number>();
            
            // Process damage and knockback for each adjacent unit in clockwise order
            for (const pos of adjacentPositions) {
                if (pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8) {
                    const targetUnit = getUnitAtPosition(pos.x, pos.y);
                    if (targetUnit) {
                        console.log(`💥 Outburst targeting ${targetUnit.name} at (${pos.x}, ${pos.y}) - direction: ${pos.direction}`);
                        
                        // Deal damage (Skill Damage - 1)
                        const baseDamage = totalSkillDamage; // totalSkillDamage already includes the -1 bonusDamage
                        const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
                        const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
                        const finalDamage = defenseResult.finalDamage;
                        
                        // Apply damage
                        const oldHealth = targetUnit.currentHealth;
                        targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
                        console.log(`💥 ${targetUnit.name} takes ${finalDamage} damage: ${oldHealth} → ${targetUnit.currentHealth}/${targetUnit.health}`);
                        
                        outburstAffectedUnits.push(targetUnit);
                        outburstDamageDealt.set(targetUnit.id, finalDamage);
                        
                        // Calculate knockback direction (away from caster)
                        const knockbackDeltaX = pos.x - casterPosition.x;
                        const knockbackDeltaY = pos.y - casterPosition.y;
                        
                        // Try to move unit 2 tiles away, then 1 tile if 2 is blocked
                        const target2TilesAway = {
                            x: pos.x + knockbackDeltaX,
                            y: pos.y + knockbackDeltaY
                        };
                        const target1TileAway = {
                            x: pos.x + Math.sign(knockbackDeltaX) * Math.min(1, Math.abs(knockbackDeltaX)),
                            y: pos.y + Math.sign(knockbackDeltaY) * Math.min(1, Math.abs(knockbackDeltaY))
                        };
                        
                        let finalDestination = null;
                        
                        // Check if 2 tiles away is valid
                        if (target2TilesAway.x >= 0 && target2TilesAway.x < 8 && 
                            target2TilesAway.y >= 0 && target2TilesAway.y < 8 &&
                            !getUnitAtPosition(target2TilesAway.x, target2TilesAway.y)) {
                            finalDestination = target2TilesAway;
                            console.log(`🌪️ ${targetUnit.name} will be knocked back 2 tiles to (${finalDestination.x}, ${finalDestination.y})`);
                        }
                        // Check if 1 tile away is valid
                        else if (target1TileAway.x >= 0 && target1TileAway.x < 8 && 
                                 target1TileAway.y >= 0 && target1TileAway.y < 8 &&
                                 !getUnitAtPosition(target1TileAway.x, target1TileAway.y)) {
                            finalDestination = target1TileAway;
                            console.log(`🌪️ ${targetUnit.name} will be knocked back 1 tile to (${finalDestination.x}, ${finalDestination.y})`);
                        } else {
                            console.log(`🚫 ${targetUnit.name} cannot be knocked back - no valid destination`);
                        }
                        
                        // Execute knockback movement if we have a valid destination
                        if (finalDestination) {
                            // Move unit to destination using the correct method
                            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                                // Use moveUnitToPosition which is the correct method
                                gameSceneInstance.unitRenderer.moveUnitToPosition(targetUnit, finalDestination);
                                console.log(`🌪️ ${targetUnit.name} knocked back to (${finalDestination.x}, ${finalDestination.y})`);
                                
                                // The movement system will handle tile effects automatically
                                console.log(`⚡ ${targetUnit.name} knockback movement completed - tile effects processed by movement system`);
                            }
                        }
                    }
                }
            }
            
            console.log(`💥 Outburst complete - affected ${outburstAffectedUnits.length} units with damage and knockback`);
            
            // Process post-skill passives before returning
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, outburstAffectedUnits);
            
            return {
                success: true,
                affectedUnits: outburstAffectedUnits,
                skill: currentSkill,
                damageDealt: outburstDamageDealt
            };
        }

        // Special handling for Entrench - push cardinally adjacent enemies back 2, grant Sturdy to adjacent allies and self
        if (currentSkill?.id === 'entrench') {
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) {
                console.warn('❌ Cannot determine caster position for Entrench');
                return null;
            }

            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const affectedUnits: Unit[] = [];

            // 1) Push cardinally adjacent enemies away from caster by up to 2 tiles
            const cardinalPositions = [
                { x: casterPosition.x, y: casterPosition.y - 1 }, // North
                { x: casterPosition.x + 1, y: casterPosition.y }, // East
                { x: casterPosition.x, y: casterPosition.y + 1 }, // South
                { x: casterPosition.x - 1, y: casterPosition.y }  // West
            ];

            for (const pos of cardinalPositions) {
                if (pos.x < 0 || pos.x >= 8 || pos.y < 0 || pos.y >= 8) continue;
                const targetUnit = getUnitAtPosition(pos.x, pos.y);
                if (targetUnit && targetUnit.team !== selectedUnit.team) {
                    const knockbackDeltaX = pos.x - casterPosition.x;
                    const knockbackDeltaY = pos.y - casterPosition.y;

                    const target2TilesAway = { x: pos.x + knockbackDeltaX, y: pos.y + knockbackDeltaY };
                    const target1TileAway = {
                        x: pos.x + Math.sign(knockbackDeltaX) * Math.min(1, Math.abs(knockbackDeltaX)),
                        y: pos.y + Math.sign(knockbackDeltaY) * Math.min(1, Math.abs(knockbackDeltaY))
                    };

                    let finalDestination: { x: number; y: number } | null = null;
                    if (
                        target2TilesAway.x >= 0 && target2TilesAway.x < 8 &&
                        target2TilesAway.y >= 0 && target2TilesAway.y < 8 &&
                        !getUnitAtPosition(target2TilesAway.x, target2TilesAway.y)
                    ) {
                        finalDestination = target2TilesAway;
                    } else if (
                        target1TileAway.x >= 0 && target1TileAway.x < 8 &&
                        target1TileAway.y >= 0 && target1TileAway.y < 8 &&
                        !getUnitAtPosition(target1TileAway.x, target1TileAway.y)
                    ) {
                        finalDestination = target1TileAway;
                    }

                    if (finalDestination && gameSceneInstance?.unitRenderer) {
                        gameSceneInstance.unitRenderer.moveUnitToPosition(targetUnit, finalDestination);
                        affectedUnits.push(targetUnit);
                    }
                }
            }

            // 2) Apply 2 Sturdy to caster and all 8-way adjacent allies (including diagonals and cardinals)
            ModifierService.applyModifier(selectedUnit, 'STURDY', 2, selectedUnit.id);
            if (gameSceneInstance?.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
            }
            affectedUnits.push(selectedUnit);

            const adjacentAlliesDeltas = [
                { dx: 0, dy: -1 }, { dx: 1, dy: -1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 1 },
                { dx: 0, dy: 1 }, { dx: -1, dy: 1 }, { dx: -1, dy: 0 }, { dx: -1, dy: -1 }
            ];
            for (const d of adjacentAlliesDeltas) {
                const tx = casterPosition.x + d.dx;
                const ty = casterPosition.y + d.dy;
                if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8) continue;
                const u = getUnitAtPosition(tx, ty);
                if (u && u.team === selectedUnit.team) {
                    ModifierService.applyModifier(u, 'STURDY', 2, selectedUnit.id);
                    affectedUnits.push(u);
                    if (gameSceneInstance?.unitRenderer) {
                        gameSceneInstance.unitRenderer.updateUnitModifiers(u);
                    }
                }
            }

            // Process post-skill passives
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affectedUnits);

            return {
                success: true,
                affectedUnits,
                skill: currentSkill
            };
        }

        // Special handling for Star Song - heal all allies on the map (except self) for 3
        if (currentSkill?.id === 'star-song') {
            console.log(`🎵 Executing Star Song for ${selectedUnit.name}`);
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (!gameSceneInstance || !gameSceneInstance.unitRenderer) {
                console.warn('❌ Cannot access GameScene unit renderer for Star Song');
                return null;
            }

            const allUnits: Unit[] = [
                ...gameSceneInstance.unitRenderer.getAllUnits()
            ];

            const allies = allUnits.filter(u => u.team === selectedUnit.team && u.id !== selectedUnit.id);
            const starSongAffectedUnits: Unit[] = [];
            const starSongHeals = new Map<string, number>();

            allies.forEach(ally => {
                const oldHealth = ally.currentHealth;
                const baseHeal = 3;
                const performHeal = ModifierService.processSkillHealPerformModifiers(selectedUnit, baseHeal);
                const receiveHeal = ModifierService.processSkillHealReceiveModifiers(ally, performHeal.finalHealing, selectedUnit);
                const healAmount = receiveHeal.finalHealing;
                ally.currentHealth = Math.min(ally.health, ally.currentHealth + healAmount);
                console.log(`💚 ${ally.name} healed for ${healAmount} by Star Song: ${oldHealth} → ${ally.currentHealth}/${ally.health}`);
                starSongAffectedUnits.push(ally);
                starSongHeals.set(ally.id, healAmount);
            });

            // Update UI for affected units
            starSongAffectedUnits.forEach(ally => {
                gameSceneInstance.unitRenderer.updateUnitBars(ally);
                gameSceneInstance.unitRenderer.updateUnitModifiers(ally);
            });

            return {
                success: true,
                affectedUnits: starSongAffectedUnits,
                skill: currentSkill,
                damageDealt: starSongHeals
            };
        }

        // Special handling for Redistribute - global ally/enemy energy and modifiers
        if (currentSkill?.id === 'redistribute') {
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const allUnits: Unit[] = gameSceneInstance?.unitRenderer?.getAllUnits ? [...gameSceneInstance.unitRenderer.getAllUnits()] : [];

            const affected: Unit[] = [];
            allUnits.forEach(u => {
                if (u.team === selectedUnit.team) {
                    const before = u.currentEnergy;
                    u.currentEnergy = Math.min(u.maxEnergy, u.currentEnergy + 2);
                    ModifierService.applyModifier(u, 'CHARGE', 2, selectedUnit.id);
                    console.log(`⚖️ Redistribute: ${u.name} +2 Energy (${before} → ${u.currentEnergy}/${u.maxEnergy}), +2 Charge`);
                    affected.push(u);
                } else {
                    const before = u.currentEnergy;
                    u.currentEnergy = Math.max(0, u.currentEnergy - 2);
                    ModifierService.applyModifier(u, 'SAP', 2, selectedUnit.id);
                    console.log(`⚖️ Redistribute: ${u.name} -2 Energy (${before} → ${u.currentEnergy}/${u.maxEnergy}), +2 Sap`);
                    affected.push(u);
                }
            });

            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affected.forEach(u => {
                    gameSceneInstance.unitRenderer.updateUnitBars(u);
                    gameSceneInstance.unitRenderer.updateUnitModifiers(u);
                });
            }

            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affected);
            return {
                success: true,
                affectedUnits: affected,
                skill: currentSkill,
                damageDealt: undefined
            };
        }

        // Get the skill's target pattern with current rotation for general skills
        const rotation = this.actionState.getSkillRotation();
        const targetPattern = currentSkill.getTargetPattern(
            targetPosition.x,
            targetPosition.y,
            'north',
            rotation
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

        affectedUnits.forEach((unit: Unit) => {
            if (currentSkill?.id === 'universal-whisper' || currentSkill?.id === 'healing-circle' || currentSkill?.id === 'bandage' || currentSkill?.id === 'finger-of-god') {
                // Healing skill - can heal anyone (including enemies)
                const baseHeal = totalSkillDamage;
                const performHeal = ModifierService.processSkillHealPerformModifiers(selectedUnit, baseHeal);
                const receiveHeal = ModifierService.processSkillHealReceiveModifiers(unit, performHeal.finalHealing, selectedUnit);
                const healAmount = receiveHeal.finalHealing;
                const oldHealth = unit.currentHealth;
                unit.currentHealth = Math.min(unit.health, unit.currentHealth + healAmount);
                const newHealth = unit.currentHealth;
                console.log(`💚 ${unit.name} healed for ${healAmount}: ${oldHealth} → ${newHealth}/${unit.health} (${currentSkill.name} can heal anyone!)`);
            } else if (currentSkill?.id === 'hype-up') {
                // Hype Up skill - apply buff modifiers to target unit
                const hasteModifier = { modifierKey: 'HASTE', stacks: 1, sourceUnitId: selectedUnit.id };
                const strengthModifier = { modifierKey: 'STRENGTH', stacks: 1, sourceUnitId: selectedUnit.id };
                const focusModifier = { modifierKey: 'FOCUS', stacks: 1, sourceUnitId: selectedUnit.id };
                
                unit.activeModifiers.push(hasteModifier);
                unit.activeModifiers.push(strengthModifier);
                unit.activeModifiers.push(focusModifier);
                
                console.log(`🔥 ${unit.name} gains 1 Haste, 1 Strength, and 1 Focus from ${selectedUnit.name}'s Hype Up!`);
                
                // Update visual modifier indicators
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    console.log(`🔍 Updating visual modifiers for ${unit.name} - current modifiers:`, unit.activeModifiers.length);
                    gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                    console.log(`🏷️ Updated visual modifiers for ${unit.name} after Hype Up`);
                    
                    // Force a render update
                    setTimeout(() => {
                        gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                        console.log(`🔄 Delayed visual modifier update for ${unit.name}`);
                    }, 100);
                }
            } else if (currentSkill?.id === 'inspire-violence') {
                // Inspire Violence - apply 4 Strength to an allied unit within range 2
                const targetUnit = unit;
                if (targetUnit.team !== selectedUnit.team) {
                    console.warn('❌ Inspire Violence can only target allied units');
                    return;
                }
                // Validate range = 2
                const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
                if (!casterPos) return;
                const dist = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
                if (dist < 0 || dist > 2) {
                    console.warn('❌ Inspire Violence target out of range (range 2)');
                    return;
                }
                ModifierService.applyModifier(targetUnit, 'STRENGTH', 4, selectedUnit.id);
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    setTimeout(() => gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit), 100);
                }
            } else if (currentSkill?.id === 'steady-beat') {
                // Steady Beat skill - apply defensive modifiers to target unit
                const sturdyModifier = { modifierKey: 'STURDY', stacks: 1, sourceUnitId: selectedUnit.id };
                const wardModifier = { modifierKey: 'WARD', stacks: 1, sourceUnitId: selectedUnit.id };
                const counterModifier = { modifierKey: 'COUNTER', stacks: 1, sourceUnitId: selectedUnit.id };
                const mirrorModifier = { modifierKey: 'MIRROR', stacks: 1, sourceUnitId: selectedUnit.id };
                
                unit.activeModifiers.push(sturdyModifier);
                unit.activeModifiers.push(wardModifier);
                unit.activeModifiers.push(counterModifier);
                unit.activeModifiers.push(mirrorModifier);
                
                console.log(`🥁 ${unit.name} gains 1 Sturdy, 1 Ward, 1 Counter, and 1 Mirror from ${selectedUnit.name}'s Steady Beat!`);
                
                // Update visual modifier indicators
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    console.log(`🔍 Updating visual modifiers for ${unit.name} - current modifiers:`, unit.activeModifiers.length);
                    gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                    console.log(`🏷️ Updated visual modifiers for ${unit.name} after Steady Beat`);
                    
                    // Force a render update
                    setTimeout(() => {
                        gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                        console.log(`🔄 Delayed visual modifier update for ${unit.name}`);
                    }, 100);
                }
            } else if (currentSkill?.id === 'mirror-aegis') {
                // Mirror Aegis - apply 7 Mirror to an allied unit within range 1
                const targetUnit = unit;
                if (targetUnit.team !== selectedUnit.team) return;
                const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
                if (!casterPos) return;
                const dist = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
                if (dist < 0 || dist > 1) return;
                ModifierService.applyModifier(targetUnit, 'MIRROR', 7, selectedUnit.id);
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    setTimeout(() => gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit), 100);
                }
            } else if (currentSkill?.id === 'peace-sign') {
                // Peace Sign - apply 3 Wish and 3 Charge to an allied unit within range 4
                const targetUnit = unit;
                if (targetUnit.team !== selectedUnit.team) return;
                const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
                if (!casterPos) return;
                const dist = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
                if (dist < 0 || dist > 4) return;
                ModifierService.applyModifier(targetUnit, 'WISH', 3, selectedUnit.id);
                ModifierService.applyModifier(targetUnit, 'CHARGE', 3, selectedUnit.id);
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    setTimeout(() => gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit), 100);
                }
            } else if (currentSkill?.id === 'reflect') {
                // Reflect - apply 2 Mirror and 2 Ward to an allied unit within range 4 (cannot target self)
                const targetUnit = unit;
                if (targetUnit.team !== selectedUnit.team) return;
                const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
                if (!casterPos) return;
                const dist = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
                // Require distance between 1 and 4 (exclude self-target)
                if (dist < 1 || dist > 4) return;
                ModifierService.applyModifier(targetUnit, 'MIRROR', 2, selectedUnit.id);
                ModifierService.applyModifier(targetUnit, 'WARD', 2, selectedUnit.id);
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    setTimeout(() => gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit), 100);
                }
            } else if (currentSkill?.id === 'primal-mark') {
                // Primal Mark - apply 3 Cursed and 3 Doubt to enemy within range 2
                const targetUnit = unit;
                if (targetUnit.team === selectedUnit.team) return; // enemies only
                const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
                if (!casterPos) return;
                const dist = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
                if (dist < 1 || dist > 2) return; // within range 2 and not self
                ModifierService.applyModifier(targetUnit, 'CURSED', 3, selectedUnit.id);
                ModifierService.applyModifier(targetUnit, 'DOUBT', 3, selectedUnit.id);
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    setTimeout(() => gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit), 100);
                }
            } else if (currentSkill?.id === 'idolize') {
                // Idolize - select any ally; apply 3 Focus to it; apply 4 Doubt to all adjacent enemies (8-way)
                const targetUnit = unit;
                if (targetUnit.team !== selectedUnit.team) return;
                // Apply 3 Focus to the ally
                ModifierService.applyModifier(targetUnit, 'FOCUS', 3, selectedUnit.id);
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance) {
                    const getUnitAtPositionLocal = (x: number, y: number): Unit | null => {
                        return gameSceneInstance.unitRenderer?.getUnitAtPosition
                            ? gameSceneInstance.unitRenderer.getUnitAtPosition(x, y)
                            : null;
                    };
                    // Find 8 neighbors around the target (cardinal + diagonal)
                    const neighbors = [
                        { dx: 0, dy: -1 }, { dx: 1, dy: -1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 1 },
                        { dx: 0, dy: 1 }, { dx: -1, dy: 1 }, { dx: -1, dy: 0 }, { dx: -1, dy: -1 }
                    ];
                    // We need target's position; if getUnitPosition is provided, use that
                    const targetPos = getUnitPosition ? getUnitPosition(targetUnit) : null;
                    if (targetPos) {
                        neighbors.forEach(({ dx, dy }) => {
                            const nx = targetPos.x + dx;
                            const ny = targetPos.y + dy;
                            if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                                const neighborUnit = getUnitAtPositionLocal(nx, ny);
                                if (neighborUnit && neighborUnit.team !== selectedUnit.team) {
                                    ModifierService.applyModifier(neighborUnit, 'DOUBT', 4, selectedUnit.id);
                                    if (gameSceneInstance.unitRenderer) {
                                        gameSceneInstance.unitRenderer.updateUnitModifiers(neighborUnit);
                                    }
                                }
                            }
                        });
                    }
                    if (gameSceneInstance.unitRenderer) {
                        gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                        setTimeout(() => gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit), 100);
                    }
                }
            } else if (currentSkill?.id === 'slip-counter') {
                // Slip Counter - apply 5 Sturdy and 5 Counter to an allied unit within range 2
                const targetUnit = unit;
                if (targetUnit.team !== selectedUnit.team) return;
                const casterPos = getUnitPosition ? getUnitPosition(selectedUnit) : null;
                if (!casterPos) return;
                const dist = Math.abs(targetPosition.x - casterPos.x) + Math.abs(targetPosition.y - casterPos.y);
                if (dist < 0 || dist > 2) return;
                ModifierService.applyModifier(targetUnit, 'STURDY', 5, selectedUnit.id);
                ModifierService.applyModifier(targetUnit, 'COUNTER', 5, selectedUnit.id);
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                    setTimeout(() => gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit), 100);
                }
            } else if (currentSkill?.id === 'switcheroo') {
                // Switcheroo skill - swap equipped items between caster and target
                const casterItem = selectedUnit.heldItem;
                const targetItem = unit.heldItem;
                
                console.log(`🔄 Switcheroo: ${selectedUnit.name} (${casterItem || 'no item'}) ↔ ${unit.name} (${targetItem || 'no item'})`);
                
                // Import EquipmentService dynamically to avoid circular dependencies
                import('../items/EquipmentService').then(({ EquipmentService }) => {
                    // Handle unequip effects for items that are being moved
                    if (casterItem) {
                        const casterItemStats = EquipmentService.getHeldItemStats(selectedUnit);
                        if (casterItemStats?.onUnequip) {
                            casterItemStats.onUnequip(selectedUnit);
                        }
                    }
                    
                    if (targetItem) {
                        const targetItemStats = EquipmentService.getHeldItemStats(unit);
                        if (targetItemStats?.onUnequip) {
                            targetItemStats.onUnequip(unit);
                        }
                    }
                    
                    // Swap the items
                    selectedUnit.heldItem = targetItem;
                    unit.heldItem = casterItem;
                    
                    // Handle equip effects for newly equipped items
                    if (targetItem) {
                        const targetItemStats = EquipmentService.getHeldItemStats(selectedUnit);
                        if (targetItemStats?.onEquip) {
                            targetItemStats.onEquip(selectedUnit);
                        }
                    }
                    
                    if (casterItem) {
                        const casterItemStats = EquipmentService.getHeldItemStats(unit);
                        if (casterItemStats?.onEquip) {
                            casterItemStats.onEquip(unit);
                        }
                    }
                    
                    console.log(`🔄 Items swapped! ${selectedUnit.name} now has: ${selectedUnit.heldItem || 'no item'}, ${unit.name} now has: ${unit.heldItem || 'no item'}`);
                });
            } else if (currentSkill?.id === 'coin-toss') {
                // Coin Toss skill - high damage attack with resource cost
                if (unit.team !== selectedUnit.team) {
                    // Process skill damage with modifiers (normal damage calculation)
                    const baseDamage = totalSkillDamage;
                    const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
                    console.log(`🪙 Coin Toss base damage: ${baseDamage}, Modified damage: ${attackResult.finalDamage}`);
                    if (attackResult.triggeredModifiers.length > 0) {
                        console.log(`💥 Attacker modifiers triggered: ${attackResult.triggeredModifiers.join(', ')}`);
                    }
                    
                    // Process defender modifiers
                    const defenseResult = ModifierService.processSkillDamageDefenseModifiers(unit, attackResult.finalDamage, selectedUnit);
                    const finalDamage = defenseResult.finalDamage;
                    console.log(`🛡️ Final damage after defense modifiers: ${finalDamage}`);
                    if (defenseResult.triggeredModifiers.length > 0) {
                        console.log(`💥 Defender modifiers triggered: ${defenseResult.triggeredModifiers.join(', ')}`);
                    }
                    
                    // Apply final damage
                    const oldHealth = unit.currentHealth;
                    unit.currentHealth = Math.max(0, unit.currentHealth - finalDamage);
                    console.log(`🪙 ${unit.name} takes ${finalDamage} damage from Coin Toss: ${oldHealth} → ${unit.currentHealth}/${unit.health}`);
                    
                    // Track final damage for animation
                    damageDealt.set(unit.id, finalDamage);
                    
                    // Apply resource penalty after successful hit - defer to next shop phase
                    import('../game/Player').then(({ mainPlayer }) => {
                        mainPlayer.addCoinTossPenalty();
                    });
                    
                    // Process post-damage modifiers (e.g., ANGER for attacking non-taunter)
                    if (finalDamage > 0) { // Only process if damage was actually dealt
                        const postDamageResult = ModifierService.processPostDamageModifiers(selectedUnit, unit);
                        if (postDamageResult.triggeredModifiers.length > 0) {
                            console.log(`😡 Post-damage modifiers triggered: ${postDamageResult.triggeredModifiers.join(', ')}`);
                        }
                        
                        // Handle deaths from post-damage modifiers (e.g., anger damage)
                        if (postDamageResult.unitsThatDied.length > 0) {
                            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                            if (gameSceneInstance) {
                                postDamageResult.unitsThatDied.forEach(deadUnit => {
                                    console.log(`💀 Handling death from post-damage modifier: ${deadUnit.name}`);
                                    gameSceneInstance.handleUnitDeath(deadUnit);
                                });
                            }
                        }
                    }
                } else {
                    console.log(`💚 Skipping friendly unit ${unit.name} (same team as caster)`);
                }
            } else if (currentSkill?.id === 'gust-of-wind') {
                // Apply 1 Haste to all Allied Units within Range = 2 from the selected target position
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                const center = this.actionState.getSelectedSkillTarget();
                if (gameSceneInstance && gameSceneInstance.unitRenderer && center) {
                    const allUnits: Unit[] = [
                        ...gameSceneInstance.unitRenderer.getAllUnits()
                    ];
                    const alliesInRange = allUnits.filter(u => u.team === selectedUnit.team).filter(u => {
                        const pos = gameSceneInstance.unitRenderer.getUnitPosition(u);
                        if (!pos) return false;
                        const dist = Math.abs(pos.x - center.x) + Math.abs(pos.y - center.y);
                        return dist <= 2;
                    });
                    alliesInRange.forEach(ally => {
                        ModifierService.applyModifier(ally, 'HASTE', 1, selectedUnit.id);
                        if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                            gameSceneInstance.unitRenderer.updateUnitModifiers(ally);
                        }
                    });
                    console.log(`🌪️ Gust of Wind applied Haste to ${alliesInRange.length} allies within range 2`);
                }
        } else if (currentSkill?.id === 'flash-of-sun') {
                // Apply 3 Blessed to adjacent allies (8-way) and 4 Burn to adjacent enemies (8-way)
                const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
                if (!casterPosition) {
                    console.warn('❌ Cannot determine caster position for Flash of Sun');
                    return null;
                }

                const adjacentPositions = [
                    { x: casterPosition.x, y: casterPosition.y - 1 },     // N
                    { x: casterPosition.x + 1, y: casterPosition.y - 1 }, // NE
                    { x: casterPosition.x + 1, y: casterPosition.y },     // E
                    { x: casterPosition.x + 1, y: casterPosition.y + 1 }, // SE
                    { x: casterPosition.x, y: casterPosition.y + 1 },     // S
                    { x: casterPosition.x - 1, y: casterPosition.y + 1 }, // SW
                    { x: casterPosition.x - 1, y: casterPosition.y },     // W
                    { x: casterPosition.x - 1, y: casterPosition.y - 1 }, // NW
                ];

                const affected: Unit[] = [];
                adjacentPositions.forEach(pos => {
                    if (pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8) {
                        const unitAt = getUnitAtPosition(pos.x, pos.y);
                        if (unitAt) {
                            if (unitAt.team === selectedUnit.team) {
                                ModifierService.applyModifier(unitAt, 'BLESSED', 3, selectedUnit.id);
                            } else {
                                ModifierService.applyModifier(unitAt, 'BURN', 4, selectedUnit.id);
                            }
                            affected.push(unitAt);
                        }
                    }
                });

                // Update visuals for affected units
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    affected.forEach(u => gameSceneInstance.unitRenderer.updateUnitModifiers(u));
                }

            return {
                    success: true,
                    affectedUnits: affected,
                    skill: currentSkill,
                    damageDealt: undefined
                };
        } else if (currentSkill?.id === 'whirlwind') {
            // Whirlwind - damage adjacent enemies and apply Haste to adjacent allies (8-way)
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;
            const positions = [
                { x: casterPosition.x, y: casterPosition.y - 1 },
                { x: casterPosition.x + 1, y: casterPosition.y - 1 },
                { x: casterPosition.x + 1, y: casterPosition.y },
                { x: casterPosition.x + 1, y: casterPosition.y + 1 },
                { x: casterPosition.x, y: casterPosition.y + 1 },
                { x: casterPosition.x - 1, y: casterPosition.y + 1 },
                { x: casterPosition.x - 1, y: casterPosition.y },
                { x: casterPosition.x - 1, y: casterPosition.y - 1 },
            ];
            const affected: Unit[] = [];
            const localDamage = new Map<string, number>();
            positions.forEach(pos => {
                if (pos.x < 0 || pos.x >= 8 || pos.y < 0 || pos.y >= 8) return;
                const unitAt = getUnitAtPosition(pos.x, pos.y);
                if (!unitAt) return;
                if (unitAt.team === selectedUnit.team) {
                    ModifierService.applyModifier(unitAt, 'HASTE', 1, selectedUnit.id);
                    affected.push(unitAt);
                } else {
                    // Damage enemies for (Skill Damage)
                    const baseDamage = totalSkillDamage;
                    const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
                    const defenseResult = ModifierService.processSkillDamageDefenseModifiers(unitAt, attackResult.finalDamage, selectedUnit);
                    const finalDamage = defenseResult.finalDamage;
                    const old = unitAt.currentHealth;
                    unitAt.currentHealth = Math.max(0, unitAt.currentHealth - finalDamage);
                    localDamage.set(unitAt.id, finalDamage);
                    affected.push(unitAt);
                    console.log(`🌪️ Whirlwind hits ${unitAt.name} for ${finalDamage}: ${old} → ${unitAt.currentHealth}/${unitAt.health}`);
                }
            });
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affected.forEach(u => {
                    gameSceneInstance.unitRenderer.updateUnitBars(u);
                    gameSceneInstance.unitRenderer.updateUnitModifiers(u);
                    if (gameSceneInstance.animationManager) {
                        if (u.team === selectedUnit.team) {
                            // Allies: emoji-only buff animation
                            gameSceneInstance.animationManager.showDebuffEffectAnimation(
                                u,
                                currentSkill.emoji,
                                (unit: Unit) => gameSceneInstance.unitRenderer.getUnitPosition(unit),
                                (unit: Unit) => gameSceneInstance.unitRenderer.getUnitMesh(unit)
                            );
                        } else {
                            // Enemies: damage animation with tornado emoji
                            const dmg = localDamage.get(u.id) ?? selectedUnit.skillDamage;
                            gameSceneInstance.animationManager.showSkillEffectAnimation(
                                u,
                                dmg,
                                currentSkill.emoji,
                                (unit: Unit) => gameSceneInstance.unitRenderer.getUnitPosition(unit),
                                (unit: Unit) => gameSceneInstance.unitRenderer.getUnitMesh(unit),
                                false
                            );
                        }
                    }
                });
            }
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affected);
            return {
                success: true,
                affectedUnits: affected,
                skill: currentSkill,
                damageDealt: localDamage
            };
        } else if (currentSkill?.id === 'shield-bash') {
            // Shield Bash: adjacent enemy; deal (Skill Damage); apply 3 Anger to target; apply 3 Sturdy to self
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) return null;
            const distance = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (distance !== 1) return null; // must be exactly range 1
            if (targetUnit.team === selectedUnit.team) return null; // must be enemy

            // Damage processing: (Skill Damage)
            const baseDamage = totalSkillDamage;
            const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
            const finalDamage = defenseResult.finalDamage;
            const oldHealth = targetUnit.currentHealth;
            targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
            console.log(`🛡️ Shield Bash hits ${targetUnit.name} for ${finalDamage}: ${oldHealth} → ${targetUnit.currentHealth}/${targetUnit.health}`);

            // Apply modifiers
            ModifierService.applyModifier(targetUnit, 'ANGER', 3, selectedUnit.id);
            ModifierService.applyModifier(selectedUnit, 'STURDY', 3, selectedUnit.id);

            // Update visuals
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
            }

            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);
            return {
                success: true,
                affectedUnits: [targetUnit, selectedUnit],
                skill: currentSkill,
                damageDealt: new Map([[targetUnit.id, finalDamage]])
            };
        } else if (currentSkill?.id === 'bouncer') {
            // Bouncer: apply 5 Counter to self and 5 Anger to all enemies within range 2
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!gameSceneInstance || !gameSceneInstance.unitRenderer || !casterPosition) return null;

            const allUnits: Unit[] = [...gameSceneInstance.unitRenderer.getAllUnits()];
            const affected: Unit[] = [];

            // Self buff
            ModifierService.applyModifier(selectedUnit, 'COUNTER', 5, selectedUnit.id);
            affected.push(selectedUnit);

            // Enemies within range 2: +5 Anger
            allUnits.forEach(u => {
                if (u.team === selectedUnit.team) return;
                const pos = gameSceneInstance.unitRenderer.getUnitPosition(u);
                if (!pos) return;
                const dist = Math.abs(pos.x - casterPosition.x) + Math.abs(pos.y - casterPosition.y);
                if (dist > 0 && dist <= 2) {
                    ModifierService.applyModifier(u, 'ANGER', 5, selectedUnit.id);
                    affected.push(u);
                }
            });

            // Update visuals
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affected.forEach(u => gameSceneInstance.unitRenderer.updateUnitModifiers(u));
            }

            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affected);
            return {
                success: true,
                affectedUnits: affected,
                skill: currentSkill,
                damageDealt: undefined
            };
        } else if (currentSkill?.id === 'symphony') {
            // Heal allies within range 2 and apply Headache to enemies within range 2
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;

            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const allUnits: Unit[] = gameSceneInstance?.unitRenderer?.getAllUnits ? [...gameSceneInstance.unitRenderer.getAllUnits()] : [];

            const affected: Unit[] = [];
            const heals = new Map<string, number>();
            allUnits.forEach(u => {
                const pos = gameSceneInstance.unitRenderer.getUnitPosition(u);
                if (!pos) return;
                const dist = Math.abs(pos.x - casterPosition.x) + Math.abs(pos.y - casterPosition.y);
                if (dist > 0 && dist <= 2) {
                    if (u.team === selectedUnit.team) {
                        const healAmount = selectedUnit.skillDamage;
                        const old = u.currentHealth;
                        u.currentHealth = Math.min(u.health, u.currentHealth + healAmount);
                        heals.set(u.id, healAmount);
                        affected.push(u);
                        console.log(`🎼 Symphony healed ${u.name} for ${healAmount}: ${old} → ${u.currentHealth}/${u.health}`);
                    } else {
                        ModifierService.applyModifier(u, 'HEADACHE', 3, selectedUnit.id);
                        affected.push(u);
                        console.log(`🎼 Symphony applied 3 Headache to ${u.name}`);
                    }
                }
            });

            // Update visuals
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affected.forEach(u => {
                    gameSceneInstance.unitRenderer.updateUnitBars(u);
                    gameSceneInstance.unitRenderer.updateUnitModifiers(u);
                });
            }

            return {
                success: true,
                affectedUnits: affected,
                skill: currentSkill,
                damageDealt: heals
            };
        } else if (currentSkill?.id === 'staccato') {
            // Restore energy to allies within range 2 and apply 3 Confusion to enemies within range 2
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;

            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const allUnits: Unit[] = gameSceneInstance?.unitRenderer?.getAllUnits ? [...gameSceneInstance.unitRenderer.getAllUnits()] : [];

            const affected: Unit[] = [];
            const energyRestores = new Map<string, number>();
            allUnits.forEach(u => {
                const pos = gameSceneInstance.unitRenderer.getUnitPosition(u);
                if (!pos) return;
                const dist = Math.abs(pos.x - casterPosition.x) + Math.abs(pos.y - casterPosition.y);
                if (dist > 0 && dist <= 2) {
                    if (u.team === selectedUnit.team) {
                        const amount = selectedUnit.skillDamage;
                        const before = u.currentEnergy;
                        u.currentEnergy = Math.min(u.maxEnergy, u.currentEnergy + amount);
                        const gained = u.currentEnergy - before;
                        energyRestores.set(u.id, gained);
                        affected.push(u);
                        console.log(`🎶 Staccato restored ${gained} Energy to ${u.name}: ${before} → ${u.currentEnergy}/${u.maxEnergy}`);
                    } else {
                        ModifierService.applyModifier(u, 'CONFUSION', 3, selectedUnit.id);
                        affected.push(u);
                        console.log(`🎶 Staccato applied 3 Confusion to ${u.name}`);
                    }
                }
            });

            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affected.forEach(u => {
                    gameSceneInstance.unitRenderer.updateUnitBars(u);
                    gameSceneInstance.unitRenderer.updateUnitModifiers(u);
                });
            }

            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affected);
            return {
                success: true,
                affectedUnits: affected,
                skill: currentSkill,
                damageDealt: energyRestores
            };
        } else if (currentSkill?.id === 'sound-barrier') {
            // Apply 2 Sturdy and 2 Ward to all allied units on the map
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const allUnits: Unit[] = gameSceneInstance?.unitRenderer?.getAllUnits ? [...gameSceneInstance.unitRenderer.getAllUnits()] : [];
            const allies = allUnits.filter(u => u.team === selectedUnit.team);
            const affected: Unit[] = [];
            allies.forEach(ally => {
                ModifierService.applyModifier(ally, 'STURDY', 2, selectedUnit.id);
                ModifierService.applyModifier(ally, 'WARD', 2, selectedUnit.id);
                affected.push(ally);
            });
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affected.forEach(u => gameSceneInstance.unitRenderer.updateUnitModifiers(u));
            }
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affected);
            return {
                success: true,
                affectedUnits: affected,
                skill: currentSkill,
                damageDealt: undefined
            };
        } else if (currentSkill?.id === 'call-to-action') {
            // Apply 1 Haste, 1 Strength, and 1 Focus to all allied units on the map
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const allUnits: Unit[] = gameSceneInstance?.unitRenderer?.getAllUnits ? [...gameSceneInstance.unitRenderer.getAllUnits()] : [];
            const allies = allUnits.filter(u => u.team === selectedUnit.team);
            const affected: Unit[] = [];
            allies.forEach(ally => {
                ModifierService.applyModifier(ally, 'HASTE', 1, selectedUnit.id);
                ModifierService.applyModifier(ally, 'STRENGTH', 1, selectedUnit.id);
                ModifierService.applyModifier(ally, 'FOCUS', 1, selectedUnit.id);
                affected.push(ally);
            });
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affected.forEach(u => gameSceneInstance.unitRenderer.updateUnitModifiers(u));
            }
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affected);
            return {
                success: true,
                affectedUnits: affected,
                skill: currentSkill,
                damageDealt: undefined
            };
        } else if (currentSkill?.id === 'phalanx') {
            // Phalanx: Apply 2 Counter to all Allied Units on the map; Apply 2 Sturdy to all adjacent Allied Units (8-way)
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const allUnits: Unit[] = gameSceneInstance?.unitRenderer?.getAllUnits ? [...gameSceneInstance.unitRenderer.getAllUnits()] : [];
            const allies = allUnits.filter(u => u.team === selectedUnit.team);
            const affected: Unit[] = [];

            // Global Counter to all allies
            allies.forEach(ally => {
                ModifierService.applyModifier(ally, 'COUNTER', 2, selectedUnit.id);
                affected.push(ally);
            });

            // Adjacent Sturdy to allied units around the caster (8 directions)
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;
            const deltas = [
                { dx: 0, dy: -1 }, { dx: 1, dy: -1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 1 },
                { dx: 0, dy: 1 }, { dx: -1, dy: 1 }, { dx: -1, dy: 0 }, { dx: -1, dy: -1 }
            ];
            for (const d of deltas) {
                const tx = casterPosition.x + d.dx;
                const ty = casterPosition.y + d.dy;
                if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8) continue;
                const u = getUnitAtPosition(tx, ty);
                if (u && u.team === selectedUnit.team) {
                    ModifierService.applyModifier(u, 'STURDY', 2, selectedUnit.id);
                    if (!affected.includes(u)) affected.push(u);
                }
            }

            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                affected.forEach(u => gameSceneInstance.unitRenderer.updateUnitModifiers(u));
            }
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affected);
            return {
                success: true,
                affectedUnits: affected,
                skill: currentSkill,
                damageDealt: undefined
            };
        } else if (currentSkill?.id === 'anthem') {
            // Apply 10 Charge to a selected allied unit within range 2
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) return null;
            const distance = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (distance < 1 || distance > 2) return null; // range 2
            if (targetUnit.team !== selectedUnit.team) return null; // must be ally
            // Spend energy
            if (selectedUnit.currentEnergy < currentSkill.energyCost) return null;
            selectedUnit.currentEnergy -= currentSkill.energyCost;
            // Apply Charge
            ModifierService.applyModifier(targetUnit, 'CHARGE', 10, selectedUnit.id);
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitBars(selectedUnit);
            }
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt: undefined
            };
        } else if (currentSkill?.id === 'rock-solid') {
            // Rock Solid: Apply 10 Sturdy to an Allied Unit within Range = 3
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) return null;
            const distance = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (distance < 1 || distance > 3) return null; // range 3
            if (targetUnit.team !== selectedUnit.team) return null; // must be ally
            if (selectedUnit.currentEnergy < currentSkill.energyCost) return null;
            selectedUnit.currentEnergy -= currentSkill.energyCost;
            ModifierService.applyModifier(targetUnit, 'STURDY', 10, selectedUnit.id);
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                gameSceneInstance.unitRenderer.updateUnitBars(selectedUnit);
            }
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt: undefined
            };
        } else if (currentSkill?.id === 'swap') {
            // Swap places with an allied unit or structure within range 3 (teleport-like)
            const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
            if (!casterPosition) return null;
            const targetUnit = getUnitAtPosition(targetPosition.x, targetPosition.y);
            if (!targetUnit) return null;
            // Must be ally
            if (targetUnit.team !== selectedUnit.team) return null;
            // Must be unit or structure (any ally is fine)
            const distance = Math.abs(targetPosition.x - casterPosition.x) + Math.abs(targetPosition.y - casterPosition.y);
            if (distance < 1 || distance > 3) return null;
            // Spend energy
            if (selectedUnit.currentEnergy < currentSkill.energyCost) return null;
            selectedUnit.currentEnergy -= currentSkill.energyCost;
            // Perform position swap
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                const casterPosCopy = { x: casterPosition.x, y: casterPosition.y };
                const targetPosCopy = { x: targetPosition.x, y: targetPosition.y };
                gameSceneInstance.unitRenderer.moveUnitToPosition(selectedUnit, targetPosCopy);
                gameSceneInstance.unitRenderer.moveUnitToPosition(targetUnit, casterPosCopy);
                gameSceneInstance.unitRenderer.updateUnitBars(selectedUnit);
                gameSceneInstance.unitRenderer.updateUnitBars(targetUnit);
            }
            PassiveService.processPostSkillPassives(selectedUnit, currentSkill, [targetUnit]);
            return {
                success: true,
                affectedUnits: [selectedUnit, targetUnit],
                skill: currentSkill,
                damageDealt: undefined
            };
        } else if (currentSkill?.id === 'tidal-lock') {
                // Deal (Skill Damage - 2) to all units within range 2 and apply 2 Wet and 2 Slow
                const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
                if (!casterPosition) return null;
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                const allUnits: Unit[] = gameSceneInstance?.unitRenderer?.getAllUnits ? [...gameSceneInstance.unitRenderer.getAllUnits()] : [];

                const affected: Unit[] = [];
                allUnits.forEach(u => {
                    const pos = gameSceneInstance.unitRenderer.getUnitPosition(u);
                    if (!pos) return;
                    const dist = Math.abs(pos.x - casterPosition.x) + Math.abs(pos.y - casterPosition.y);
                    if (dist > 0 && dist <= 2) {
                        // Damage processing (affects all units)
                        const baseDamage = totalSkillDamage; // includes -2 bonus
                        const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
                        const defenseResult = ModifierService.processSkillDamageDefenseModifiers(u, attackResult.finalDamage, selectedUnit);
                        const finalDamage = defenseResult.finalDamage;
                        const oldHealth = u.currentHealth;
                        u.currentHealth = Math.max(0, u.currentHealth - finalDamage);
                        damageDealt.set(u.id, finalDamage);
                        console.log(`🌊 Tidal Lock hits ${u.name} for ${finalDamage}: ${oldHealth} → ${u.currentHealth}/${u.health}`);

                        // Apply debuffs
                        ModifierService.applyModifier(u, 'WET', 2, selectedUnit.id);
                        ModifierService.applyModifier(u, 'SLOW', 2, selectedUnit.id);
                        affected.push(u);
                    }
                });

                // Update visuals
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    affected.forEach(u => {
                        gameSceneInstance.unitRenderer.updateUnitBars(u);
                        gameSceneInstance.unitRenderer.updateUnitModifiers(u);
                    });
                }

                // Post-skill passives
                PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affected);

                return {
                    success: true,
                    affectedUnits: affected,
                    skill: currentSkill,
                    damageDealt
                };
            } else if (currentSkill?.id === "gaias-rage") {
                // Gaia's Rage: enemy-only damage within range 2 and convert tiles to Flame Tiles
                const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
                if (!casterPosition) return null;
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                const allUnits: Unit[] = gameSceneInstance?.unitRenderer?.getAllUnits ? [...gameSceneInstance.unitRenderer.getAllUnits()] : [];

                const affected: Unit[] = [];
                allUnits.forEach(u => {
                    const pos = gameSceneInstance.unitRenderer.getUnitPosition(u);
                    if (!pos) return;
                    const dist = Math.abs(pos.x - casterPosition.x) + Math.abs(pos.y - casterPosition.y);
                    if (dist > 0 && dist <= 2 && u.team !== selectedUnit.team) {
                        const baseDamage = totalSkillDamage; // includes -1 bonus
                        const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
                        const defenseResult = ModifierService.processSkillDamageDefenseModifiers(u, attackResult.finalDamage, selectedUnit);
                        const finalDamage = defenseResult.finalDamage;
                        const oldHealth = u.currentHealth;
                        u.currentHealth = Math.max(0, u.currentHealth - finalDamage);
                        damageDealt.set(u.id, finalDamage);
                        console.log(`🌋 Gaia's Rage hits ${u.name} for ${finalDamage}: ${oldHealth} → ${u.currentHealth}/${u.health}`);
                        affected.push(u);
                    }
                });

                // Convert all tiles within range 2 (excluding caster tile) to Flame Tiles
                for (let dx = -2; dx <= 2; dx++) {
                    for (let dy = -2; dy <= 2; dy++) {
                        const dist = Math.abs(dx) + Math.abs(dy);
                        if (dist <= 2 && !(dx === 0 && dy === 0)) {
                            const tx = casterPosition.x + dx;
                            const ty = casterPosition.y + dy;
                            if (tx >= 0 && tx < 8 && ty >= 0 && ty < 8) {
                                globalTileEffectManager.addEffect('flame-tile', { x: tx, y: ty }, -1, selectedUnit.id);
                            }
                        }
                    }
                }

                // Update visuals
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    affected.forEach(u => {
                        gameSceneInstance.unitRenderer.updateUnitBars(u);
                    });
                }
                const globalTileEffectRenderer = (window as any).globalTileEffectRenderer;
                if (globalTileEffectRenderer) {
                    globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
                }

                // Post-skill passives
                PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affected);

                return {
                    success: true,
                    affectedUnits: affected,
                    skill: currentSkill,
                    damageDealt
                };
            } else if (currentSkill?.id === 'plasma-tempest') {
                // Plasma Tempest: select ally exactly 3 away in cardinal dir; apply 3 Charge to that ally; deal (Skill Damage -1) to all units within range 2 of that ally
                const casterPosition = getUnitPosition ? getUnitPosition(selectedUnit) : null;
                if (!casterPosition) return null;

                // Find target unit at selected position and validate ally and exact 3 distance (cardinal)
                const targetUnit = getUnitAtPosition ? getUnitAtPosition(targetPosition.x, targetPosition.y) : null;
                if (!targetUnit) {
                    console.warn('❌ Plasma Tempest requires an allied unit at the selected tile');
                    return null;
                }
                if (targetUnit.team !== selectedUnit.team) {
                    console.warn('❌ Plasma Tempest target must be an ally');
                    return null;
                }
                const dx = Math.abs(targetPosition.x - casterPosition.x);
                const dy = Math.abs(targetPosition.y - casterPosition.y);
                if (!((dx === 3 && dy === 0) || (dx === 0 && dy === 3))) {
                    console.warn('❌ Plasma Tempest target must be exactly 3 tiles away in a cardinal direction');
                    return null;
                }

                // Apply 3 Charge to the ally
                ModifierService.applyModifier(targetUnit, 'CHARGE', 3, selectedUnit.id);

                // Damage all units within range 2 of the ally
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                const allUnits: Unit[] = gameSceneInstance?.unitRenderer?.getAllUnits ? [...gameSceneInstance.unitRenderer.getAllUnits()] : [];
                const affected: Unit[] = [targetUnit];
                allUnits.forEach(u => {
                    const pos = gameSceneInstance.unitRenderer.getUnitPosition(u);
                    if (!pos) return;
                    const dist = Math.abs(pos.x - targetPosition.x) + Math.abs(pos.y - targetPosition.y);
                    if (dist > 0 && dist <= 2) {
                        const baseDamage = totalSkillDamage; // includes -1
                        const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
                        const defenseResult = ModifierService.processSkillDamageDefenseModifiers(u, attackResult.finalDamage, selectedUnit);
                        const finalDamage = defenseResult.finalDamage;
                        const old = u.currentHealth;
                        u.currentHealth = Math.max(0, u.currentHealth - finalDamage);
                        damageDealt.set(u.id, finalDamage);
                        console.log(`🌪️ Plasma Tempest hits ${u.name} for ${finalDamage}: ${old} → ${u.currentHealth}/${u.health}`);
                        if (!affected.find(x => x.id === u.id)) affected.push(u);
                    }
                });

                // Update visuals
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    affected.forEach(u => {
                        gameSceneInstance.unitRenderer.updateUnitBars(u);
                        gameSceneInstance.unitRenderer.updateUnitModifiers(u);
                    });
                }

                // Post-skill passives
                PassiveService.processPostSkillPassives(selectedUnit, currentSkill, affected);

                return {
                    success: true,
                    affectedUnits: affected,
                    skill: currentSkill,
                    damageDealt
                };
            } else {
                // Damage skill - only damage enemy units
                if (unit.team !== selectedUnit.team) {
                    // Process skill damage with modifiers
                    const baseDamage = totalSkillDamage;
                    const attackResult = ModifierService.processSkillDamageModifiers(selectedUnit, baseDamage);
                    console.log(`💥 Base damage: ${baseDamage}, Modified damage: ${attackResult.finalDamage}`);
                    if (attackResult.triggeredModifiers.length > 0) {
                        console.log(`💥 Attacker modifiers triggered: ${attackResult.triggeredModifiers.join(', ')}`);
                    }
                    
                    // Process defender modifiers
                    const defenseResult = ModifierService.processSkillDamageDefenseModifiers(unit, attackResult.finalDamage, selectedUnit);
                    const finalDamage = defenseResult.finalDamage;
                    console.log(`🛡️ Final damage after defense modifiers: ${finalDamage}`);
                    if (defenseResult.triggeredModifiers.length > 0) {
                        console.log(`💥 Defender modifiers triggered: ${defenseResult.triggeredModifiers.join(', ')}`);
                    }
                    
                    // Apply final damage
                    const oldHealth = unit.currentHealth;
                    unit.currentHealth = Math.max(0, unit.currentHealth - finalDamage);
                    const newHealth = unit.currentHealth;
                    console.log(`💥 ${unit.name} takes ${finalDamage} damage: ${oldHealth} → ${newHealth}/${unit.health}`);
                    
                    // Track final damage for animation
                    damageDealt.set(unit.id, finalDamage);
                    
                    // Process post-damage modifiers (e.g., ANGER for attacking non-taunter)
                    if (finalDamage > 0) { // Only process if damage was actually dealt
                        const postDamageResult = ModifierService.processPostDamageModifiers(selectedUnit, unit);
                        if (postDamageResult.triggeredModifiers.length > 0) {
                            console.log(`😡 Post-damage modifiers triggered: ${postDamageResult.triggeredModifiers.join(', ')}`);
                        }
                        
                        // Handle deaths from post-damage modifiers (e.g., anger damage)
                        if (postDamageResult.unitsThatDied.length > 0) {
                            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                            if (gameSceneInstance) {
                                postDamageResult.unitsThatDied.forEach(deadUnit => {
                                    console.log(`💀 Handling death from post-damage modifier: ${deadUnit.name}`);
                                    gameSceneInstance.handleUnitDeath(deadUnit);
                                });
                            }
                        }
                    }
                } else {
                    console.log(`💚 Skipping friendly unit ${unit.name} (same team as caster)`);
                }
            }
        });
        
        // Filter to only return units that were actually affected
        const actuallyAffectedUnits = affectedUnits.filter(unit => {
            if (currentSkill?.id === 'universal-whisper' || currentSkill?.id === 'healing-circle' || currentSkill?.id === 'bandage' || currentSkill?.id === 'finger-of-god' || currentSkill?.id === 'hype-up' || currentSkill?.id === 'steady-beat' || currentSkill?.id === 'switcheroo') {
                return true; // Healing, buff, and utility skills affect everyone they target
            } else {
                return unit.team !== selectedUnit.team; // Only enemies for damage
            }
        });
        
        console.log(`✅ Skill ${currentSkill.name} executed successfully, affected ${actuallyAffectedUnits.length} units`);
        
        // Process post-skill passives (like Mastery for damage-dealing skills)
        PassiveService.processPostSkillPassives(selectedUnit, currentSkill, actuallyAffectedUnits);
        
        return {
            success: true,
            affectedUnits: actuallyAffectedUnits,
            skill: currentSkill,
            damageDealt
        };
    }
} 