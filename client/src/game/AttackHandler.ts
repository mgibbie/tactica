import { Unit } from '../units/Unit';
import { ActionState } from './ActionState';
import { ModifierService } from './ModifierService';
import { PassiveService } from './PassiveService';

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
        
        // Handle deaths from attacker modifiers (e.g., burn damage)
        if (attackResult.unitsThatDied.length > 0) {
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance) {
                attackResult.unitsThatDied.forEach(deadUnit => {
                    console.log(`💀 Handling death from attacker modifier: ${deadUnit.name}`);
                    gameSceneInstance.handleUnitDeath(deadUnit);
                });
            }
        }
        
        // Process defender modifiers
        const defenseResult = ModifierService.processBasicAttackDefenseModifiers(targetUnit, attackResult.finalDamage, selectedUnit);
        const finalDamage = defenseResult.finalDamage;
        console.log(`🛡️ Final damage after defense modifiers: ${finalDamage}`);
        if (defenseResult.triggeredModifiers.length > 0) {
            console.log(`🔥 Defender modifiers triggered: ${defenseResult.triggeredModifiers.join(', ')}`);
        }
        
        // Process receive-basic-attack passives for the target unit
        PassiveService.processReceiveBasicAttackPassives(targetUnit);
        
        // Check if unit has enough energy for the attack (all units can attack with 0 energy)
        if (selectedUnit.currentEnergy < 0) {
            console.warn(`❌ Not enough energy for basic attack. Required: 0, Current: ${selectedUnit.currentEnergy}`);
            
            // Show failed animation on the unit that tried to attack
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.animationManager && gameSceneInstance.unitRenderer) {
                gameSceneInstance.animationManager.showFailedTextPopup(
                    selectedUnit,
                    (unit: Unit) => gameSceneInstance.unitRenderer.getUnitPosition(unit)
                );
                console.log(`🎬 Showing FAILED animation for ${selectedUnit.name} due to insufficient energy for basic attack`);
            }
            
            return null;
        }
        
        // Apply final damage to target
        const oldHealth = targetUnit.currentHealth;
        targetUnit.currentHealth = Math.max(0, targetUnit.currentHealth - finalDamage);
        const newHealth = targetUnit.currentHealth;
        
        // Handle energy changes for basic attacks FIRST (before action modifiers)
        const oldEnergy = selectedUnit.currentEnergy;
        
        if (selectedUnit.energyType.toLowerCase() === 'kinetic') {
            // Kinetic units GAIN 5 energy from basic attacks (no cost)
            const energyGain = 5;
            selectedUnit.currentEnergy = Math.min(selectedUnit.maxEnergy, selectedUnit.currentEnergy + energyGain);
            console.log(`⚡ Kinetic unit ${selectedUnit.name} gains ${energyGain} energy from attack: ${oldEnergy} → ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);
        } else {
            // Potential units consume 0 energy for basic attacks
            const energyCost = 0;
            selectedUnit.currentEnergy = Math.max(0, selectedUnit.currentEnergy - energyCost);
            console.log(`⚡ Potential unit ${selectedUnit.name} consumes ${energyCost} energy: ${oldEnergy} → ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);
        }
        
        // Process action modifiers (like Shocked) AFTER energy changes from the attack
        const actionModifierResult = ModifierService.processActionModifiers(selectedUnit);
        if (actionModifierResult.triggeredModifiers.length > 0) {
            console.log(`⚡ Action modifiers triggered for ${selectedUnit.name} after attack: ${actionModifierResult.triggeredModifiers.join(', ')}`);
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
        
        console.log(`💥 ${selectedUnit.name} attacks ${targetUnit.name} for ${finalDamage} damage`);
        console.log(`🩸 ${targetUnit.name} health: ${oldHealth} → ${newHealth}/${targetUnit.health}`);
        
        // Process post-damage modifiers (e.g., ANGER for attacking non-taunter)
        if (finalDamage > 0) { // Only process if damage was actually dealt
            const postDamageResult = ModifierService.processPostDamageModifiers(selectedUnit, targetUnit);
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
        
        return { success: true, damage: finalDamage, target: targetUnit };
    }

    public cancelAttack(): void {
        console.log('❌ Cancelling attack');
        this.actionState.setSelectedAttackTarget(null);
        this.actionState.setTargetUnit(null);
    }
} 