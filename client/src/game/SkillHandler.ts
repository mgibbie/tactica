import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';
import { ActionState } from './ActionState';
import { ModifierService } from './ModifierService';

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
        getUnitAtPosition: (x: number, y: number) => Unit | null
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
            
            console.log(`🛡️ ${selectedUnit.name} prepared themselves with Strength and Sturdy modifiers`);
            
            return {
                success: true,
                affectedUnits: [selectedUnit],
                skill: currentSkill
            };
        }

        affectedUnits.forEach(unit => {
            if (currentSkill?.id === 'universal-whisper') {
                // Healing skill - can heal anyone (including enemies)
                const healAmount = totalSkillDamage;
                const oldHealth = unit.currentHealth;
                unit.currentHealth = Math.min(unit.health, unit.currentHealth + healAmount);
                const newHealth = unit.currentHealth;
                console.log(`💚 ${unit.name} healed for ${healAmount}: ${oldHealth} → ${newHealth}/${unit.health} (Universal Whisper can heal anyone!)`);
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
        
        // Filter to only return units that were actually affected
        const actuallyAffectedUnits = affectedUnits.filter(unit => {
            if (currentSkill?.id === 'universal-whisper') {
                return true; // Universal Whisper affects everyone it targets (heals anyone)
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