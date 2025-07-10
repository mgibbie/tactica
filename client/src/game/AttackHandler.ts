import { Unit } from '../units/Unit';
import { ActionState } from './ActionState';
import { ModifierService } from './ModifierService';

export interface AttackResult {
    success: boolean;
    damage: number;
    target: Unit;
}

export class AttackHandler {
    constructor(private actionState: ActionState) {}

    public selectTarget(
        x: number, 
        y: number, 
        getUnitAtPosition: (x: number, y: number) => Unit | null, 
        selectedUnit: Unit
    ): { success: boolean; targetUnit: Unit | null } {
        console.log(`🎯 Attempting to select attack target at (${x}, ${y})`);
        
        const currentAttackData = this.actionState.getCurrentAttackData();
        if (!currentAttackData) {
            console.warn("❌ No attack data available");
            return { success: false, targetUnit: null };
        }
        
        // Check if the target position is valid
        const isValidTarget = currentAttackData.validTiles.some(tile => 
            tile.x === x && tile.y === y
        );
        
        if (!isValidTarget) {
            console.log(`❌ Invalid target: (${x}, ${y}) - not in valid targets`);
            return { success: false, targetUnit: null };
        }
        
        const targetUnit = getUnitAtPosition(x, y);
        if (!targetUnit) {
            console.log(`❌ No unit found at attack target (${x}, ${y})`);
            return { success: false, targetUnit: null };
        }
        
        // Check if target is an enemy (can't attack same team)
        if (targetUnit.team === selectedUnit.team) {
            console.log(`❌ Cannot attack unit of same team: ${targetUnit.name}`);
            return { success: false, targetUnit: null };
        }
        
        this.actionState.setSelectedAttackTarget({ x, y });
        this.actionState.setTargetUnit(targetUnit);
        console.log(`✅ Selected valid attack target: ${targetUnit.name} at (${x}, ${y})`);
        return { success: true, targetUnit };
    }

    public confirmAttack(selectedUnit: Unit): AttackResult | null {
        console.log(`⚔️ Confirming attack from ${selectedUnit.name}`);
        
        const selectedTarget = this.actionState.getSelectedAttackTarget();
        const targetUnit = this.actionState.getTargetUnit();
        
        if (!selectedTarget || !targetUnit) {
            console.warn("❌ No attack target selected");
            return null;
        }
        
        // Calculate basic attack damage with attacker modifiers
        const baseDamage = selectedUnit.basicDamage;
        const attackResult = ModifierService.processBasicAttackDamageModifiers(selectedUnit, baseDamage);
        console.log(`💥 Base damage: ${baseDamage}, Modified damage: ${attackResult.finalDamage}`);
        if (attackResult.triggeredModifiers.length > 0) {
            console.log(`🔥 Attacker modifiers triggered: ${attackResult.triggeredModifiers.join(', ')}`);
        }
        
        // Process defender modifiers
        const defenseResult = ModifierService.processBasicAttackDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
        const finalDamage = defenseResult.finalDamage;
        console.log(`🛡️ Final damage after defense modifiers: ${finalDamage}`);
        if (defenseResult.triggeredModifiers.length > 0) {
            console.log(`🔥 Defender modifiers triggered: ${defenseResult.triggeredModifiers.join(', ')}`);
        }
        
        // Apply final damage to target
        const oldHealth = targetUnit.currentHealth;
        targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
        const newHealth = targetUnit.currentHealth;
        
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
        
        console.log(`💥 ${selectedUnit.name} attacks ${targetUnit.name} for ${finalDamage} damage`);
        console.log(`🩸 ${targetUnit.name} health: ${oldHealth} → ${newHealth}/${targetUnit.health}`);
        
        return { success: true, damage: finalDamage, target: targetUnit };
    }

    public cancelAttack(): void {
        console.log('❌ Cancelling attack');
        this.actionState.setSelectedAttackTarget(null);
        this.actionState.setTargetUnit(null);
    }
} 