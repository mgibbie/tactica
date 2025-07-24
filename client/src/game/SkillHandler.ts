import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';
import { ModifierService } from './ModifierService';
import { ActionState } from './ActionState';
import { globalTileEffectManager } from './TileEffect';
import { globalTileEffectRenderer } from './TileEffectRenderer';
import { Position } from './NavigationManager';

export interface SkillResult {
    success: boolean;
    affectedUnits: Unit[];
    skill: Skill;
}

export class SkillHandler {
    constructor(private actionState: ActionState) {}

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
        console.log('✨ Confirming skill attack');
        
        const currentSkill = this.actionState.getCurrentSkill();
        if (!currentSkill) {
            console.warn('❌ No skill selected');
            return null;
        }
        
        const targetPosition = this.actionState.getSelectedSkillTarget();
        if (!targetPosition) {
            console.warn('❌ No skill target selected - this should not happen');
            return null;
        }
        
        console.log(`✨ Executing skill: ${currentSkill.name} at (${targetPosition.x}, ${targetPosition.y})`);
        
        // Check energy cost
        if (selectedUnit.currentEnergy < currentSkill.energyCost) {
            console.warn(`❌ Not enough energy for ${currentSkill.name}. Required: ${currentSkill.energyCost}, Current: ${selectedUnit.currentEnergy}`);
            return null;
        }
        
        // Consume energy
        const oldEnergy = selectedUnit.currentEnergy;
        selectedUnit.currentEnergy = Math.max(0, selectedUnit.currentEnergy - currentSkill.energyCost);
        console.log(`⚡ ${selectedUnit.name} energy: ${oldEnergy} → ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);
        
        // Get the skill's target pattern with current rotation
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
        
        // Apply skill effects to affected units
        const totalSkillDamage = selectedUnit.skillDamage + (currentSkill.bonusDamage || 0);
        
        // Special handling for self-targeting skills like Bandage
        if (currentSkill?.id === 'bandage') {
            const healAmount = totalSkillDamage;
            const oldHealth = selectedUnit.currentHealth;
            selectedUnit.currentHealth = Math.min(selectedUnit.health, selectedUnit.currentHealth + healAmount);
            const newHealth = selectedUnit.currentHealth;
            console.log(`🩹 ${selectedUnit.name} bandaged themselves for ${healAmount} healing: ${oldHealth} → ${newHealth}/${selectedUnit.health}`);
            
            return {
                success: true,
                affectedUnits: [selectedUnit],
                skill: currentSkill
            };
        }

        // Special handling for Prepare skill - applies modifiers
        if (currentSkill?.id === 'prepare') {
            // Apply 1 stack of Strength and 1 stack of Sturdy to self
            ModifierService.applyModifier(selectedUnit, 'STRENGTH', 1, selectedUnit.id);
            ModifierService.applyModifier(selectedUnit, 'STURDY', 1, selectedUnit.id);
            
            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(selectedUnit);
                console.log(`🏷️ Updated visual modifiers for ${selectedUnit.name} after Prepare`);
            }
            
            console.log(`🛡️ ${selectedUnit.name} prepared themselves with Strength and Sturdy modifiers`);
            
            return {
                success: true,
                affectedUnits: [selectedUnit],
                skill: currentSkill
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
            
            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                console.log(`🏷️ Updated visual modifiers for ${targetUnit.name} after Exhaust`);
            }
            
            console.log(`😴 ${selectedUnit.name} exhausted ${targetUnit.name} - applied Weak, Slow, and Tired!`);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill
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
            
            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                console.log(`🏷️ Updated visual modifiers for ${targetUnit.name} after Jeer`);
            }
            
            console.log(`😈 ${selectedUnit.name} jeered at ${targetUnit.name} - applied 3 Exposed and 3 Weak!`);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill
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
            const newHealth = targetUnit.currentHealth;
            console.log(`🔥 ${targetUnit.name} takes ${finalDamage} damage from Flare Shot: ${oldHealth} → ${newHealth}/${targetUnit.health}`);
            
            // Apply 3 stacks of Burn
            ModifierService.applyModifier(targetUnit, 'BURN', 3, selectedUnit.id);
            
            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                console.log(`🏷️ Updated visual modifiers for ${targetUnit.name} after Flare Shot`);
            }
            
            console.log(`🔥 ${selectedUnit.name} hit ${targetUnit.name} with Flare Shot - dealt ${finalDamage} damage and applied 3 Burn!`);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill
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
            
            // Apply 2 stacks of Wet
            ModifierService.applyModifier(targetUnit, 'WET', 2, selectedUnit.id);
            
            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitModifiers(targetUnit);
                console.log(`🏷️ Updated visual modifiers for ${targetUnit.name} after Splash`);
            }
            
            console.log(`💧 ${selectedUnit.name} hit ${targetUnit.name} with Splash - dealt ${finalDamage} damage and applied 2 Wet!`);
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill
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

        affectedUnits.forEach(unit => {
            if (currentSkill?.id === 'universal-whisper' || currentSkill?.id === 'healing-circle') {
                // Healing skill - can heal anyone (including enemies)
                const healAmount = totalSkillDamage;
                const oldHealth = unit.currentHealth;
                unit.currentHealth = Math.min(unit.health, unit.currentHealth + healAmount);
                const newHealth = unit.currentHealth;
                console.log(`💚 ${unit.name} healed for ${healAmount}: ${oldHealth} → ${newHealth}/${unit.health} (${currentSkill.name} can heal anyone!)`);
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
                }
            }
        });
        
        // Filter to only return units that were actually affected
        const actuallyAffectedUnits = affectedUnits.filter(unit => {
            if (currentSkill?.id === 'universal-whisper' || currentSkill?.id === 'healing-circle') {
                return true; // Healing skills affect everyone they target (heals anyone)
            } else {
                return unit.team !== selectedUnit.team; // Only enemies for damage
            }
        });
        
        console.log(`✅ Skill ${currentSkill.name} executed successfully, affected ${actuallyAffectedUnits.length} units`);
        
        return {
            success: true,
            affectedUnits: actuallyAffectedUnits,
            skill: currentSkill
        };
    }
} 