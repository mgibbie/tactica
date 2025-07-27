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
        
        // Process action modifiers (like Shocked) before performing the skill
        const actionModifierResult = ModifierService.processActionModifiers(selectedUnit);
        if (actionModifierResult.triggeredModifiers.length > 0) {
            console.log(`⚡ Action modifiers triggered for ${selectedUnit.name}: ${actionModifierResult.triggeredModifiers.join(', ')}`);
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
            
            return {
                success: true,
                affectedUnits: [targetUnit],
                skill: currentSkill,
                damageDealt
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
                    
                    // Track final damage for animation
                    damageDealt.set(unit.id, finalDamage);
                } else {
                    console.log(`💚 Skipping friendly unit ${unit.name} (same team as caster)`);
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
            skill: currentSkill,
            damageDealt
        };
    }
} 