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
                const healAmount = totalSkillDamage;
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