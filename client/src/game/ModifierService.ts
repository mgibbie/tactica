import { Unit } from '../units/Unit';
import { ActiveModifier, ModifierDefinition, ModifierTriggerType } from '../units/Modifier';
import { MODIFIER_DEX } from '../units/ModifierDex';
import { globalUnitRegistry } from '../units/UnitRegistry';

export class ModifierService {
    
    /**
     * Apply a modifier to a unit
     */
    public static applyModifier(
        targetUnit: Unit,
        modifierKey: string,
        stacks: number,
        sourceUnitId: string
    ): boolean {
        const modifierDef = MODIFIER_DEX[modifierKey];
        if (!modifierDef) {
            console.warn(`❌ Unknown modifier: ${modifierKey}`);
            return false;
        }

        // Check if unit already has this modifier
        const existingModifier = targetUnit.activeModifiers.find(m => m.modifierKey === modifierKey);
        
        if (existingModifier) {
            // Add stacks to existing modifier
            existingModifier.stacks += stacks;
            console.log(`🔄 Added ${stacks} stacks of ${modifierDef.name} to ${targetUnit.name} (Total: ${existingModifier.stacks})`);
        } else {
            // Create new modifier
            const newModifier: ActiveModifier = {
                modifierKey,
                stacks,
                sourceUnitId
            };
            targetUnit.activeModifiers.push(newModifier);
            console.log(`✨ Applied ${stacks} stacks of ${modifierDef.name} to ${targetUnit.name}`);
        }

        return true;
    }

    /**
     * Remove stacks of a modifier from a unit
     */
    public static removeModifierStacks(
        unit: Unit,
        modifierKey: string,
        stacksToRemove: number
    ): void {
        const modifierIndex = unit.activeModifiers.findIndex(m => m.modifierKey === modifierKey);
        if (modifierIndex === -1) return;

        const modifier = unit.activeModifiers[modifierIndex];
        const modifierDef = MODIFIER_DEX[modifierKey];
        
        if (stacksToRemove >= modifier.stacks) {
            // Remove entire modifier
            unit.activeModifiers.splice(modifierIndex, 1);
            console.log(`🗑️ Removed all ${modifier.stacks} stacks of ${modifierDef?.name || modifierKey} from ${unit.name}`);
        } else {
            // Remove partial stacks
            modifier.stacks -= stacksToRemove;
            console.log(`🔽 Removed ${stacksToRemove} stacks of ${modifierDef?.name || modifierKey} from ${unit.name} (${modifier.stacks} remaining)`);
        }
    }

    /**
     * Get all modifiers of a specific trigger type for a unit
     */
    public static getModifiersByTrigger(
        unit: Unit,
        triggerType: ModifierTriggerType
    ): { modifier: ActiveModifier, definition: ModifierDefinition }[] {
        return unit.activeModifiers
            .map(modifier => ({
                modifier,
                definition: MODIFIER_DEX[modifier.modifierKey]
            }))
            .filter(({ definition }) => definition && definition.triggerType === triggerType);
    }

    /**
     * Process modifiers for basic attack damage (attacker)
     */
    public static processBasicAttackDamageModifiers(attacker: Unit, baseDamage: number): {
        finalDamage: number,
        triggeredModifiers: string[]
    } {
        let finalDamage = baseDamage;
        const triggeredModifiers: string[] = [];

        const attackModifiers = this.getModifiersByTrigger(attacker, ModifierTriggerType.ON_PERFORM_BASIC_ATTACK);
        
        for (const { modifier, definition } of attackModifiers) {
            switch (definition.key) {
                case 'STRENGTH':
                    finalDamage += modifier.stacks;
                    triggeredModifiers.push(`+${modifier.stacks} damage from Strength`);
                    break;
                case 'WEAK':
                    finalDamage -= modifier.stacks;
                    triggeredModifiers.push(`-${modifier.stacks} damage from Weak`);
                    break;
                case 'BURN':
                    // Self-damage
                    attacker.currentHealth = Math.max(0, attacker.currentHealth - modifier.stacks);
                    triggeredModifiers.push(`${modifier.stacks} self-damage from Burn`);
                    break;
            }

            // Remove the modifier (all stacks consumed)
            this.removeModifierStacks(attacker, modifier.modifierKey, modifier.stacks);
        }

        return { finalDamage: Math.max(0, finalDamage), triggeredModifiers };
    }

    /**
     * Process modifiers for basic attack damage (defender)
     */
    public static processBasicAttackDefenseModifiers(defender: Unit, incomingDamage: number, attacker: Unit): {
        finalDamage: number,
        triggeredModifiers: string[]
    } {
        let finalDamage = incomingDamage;
        const triggeredModifiers: string[] = [];

        const defenseModifiers = this.getModifiersByTrigger(defender, ModifierTriggerType.ON_RECEIVE_BASIC_ATTACK);
        
        for (const { modifier, definition } of defenseModifiers) {
            switch (definition.key) {
                case 'EXPOSED':
                    finalDamage += modifier.stacks;
                    triggeredModifiers.push(`+${modifier.stacks} damage from Exposed`);
                    break;
                case 'STURDY':
                    finalDamage -= modifier.stacks;
                    triggeredModifiers.push(`-${modifier.stacks} damage from Sturdy`);
                    break;
                case 'LEECH':
                    // Heal the source unit
                    const sourceUnit = this.findUnitById(modifier.sourceUnitId);
                    if (sourceUnit) {
                        sourceUnit.currentHealth = Math.min(sourceUnit.health, sourceUnit.currentHealth + modifier.stacks);
                        triggeredModifiers.push(`${modifier.stacks} health to ${sourceUnit.name} from Leech`);
                    }
                    break;
                case 'COUNTER':
                    // Damage the attacker
                    attacker.currentHealth = Math.max(0, attacker.currentHealth - modifier.stacks);
                    triggeredModifiers.push(`${modifier.stacks} counter damage to ${attacker.name}`);
                    break;
            }

            // Remove the modifier (all stacks consumed)
            this.removeModifierStacks(defender, modifier.modifierKey, modifier.stacks);
        }

        return { finalDamage: Math.max(0, finalDamage), triggeredModifiers };
    }

    /**
     * Get modifier color based on the image colors you specified
     */
    public static getModifierColor(modifierKey: string): string {
        switch (modifierKey) {
            case 'STRENGTH':
                return '#3498db'; // Blue (from your image)
            case 'STURDY':
                return '#e67e22'; // Orange (from your image)
            case 'WEAK':
                return '#e74c3c'; // Red
            case 'EXPOSED':
                return '#8e44ad'; // Purple
            case 'FOCUS':
                return '#2ecc71'; // Green
            case 'CONFUSION':
                return '#f39c12'; // Yellow-orange
            case 'WARD':
                return '#1abc9c'; // Teal
            case 'WET':
                return '#3498db'; // Blue
            case 'HASTE':
                return '#f1c40f'; // Yellow
            case 'SLOW':
                return '#95a5a6'; // Gray
            case 'BLEED':
                return '#c0392b'; // Dark red
            case 'TIRED':
                return '#7f8c8d'; // Dark gray
            default:
                return '#bdc3c7'; // Light gray default
        }
    }

    /**
     * Get abbreviated modifier name for visual indicators
     */
    public static getModifierAbbreviation(modifierKey: string): string {
        switch (modifierKey) {
            case 'STRENGTH': return 'STR';
            case 'STURDY': return 'STU';
            case 'WEAK': return 'WEA';
            case 'EXPOSED': return 'EXP';
            case 'FOCUS': return 'FOC';
            case 'CONFUSION': return 'CON';
            case 'WARD': return 'WAR';
            case 'WET': return 'WET';
            case 'HASTE': return 'HAS';
            case 'SLOW': return 'SLO';
            case 'BLEED': return 'BLE';
            case 'TIRED': return 'TIR';
            case 'HEADACHE': return 'HEA';
            case 'SHOCKED': return 'SHO';
            case 'BLESSED': return 'BLE';
            case 'CURSED': return 'CUR';
            case 'FAITH': return 'FAI';
            case 'DOUBT': return 'DOU';
            case 'TOXICITY': return 'TOX';
            case 'LEAK': return 'LEA';
            case 'GLITCHED': return 'GLI';
            case 'WISH': return 'WIS';
            case 'CHARGE': return 'CHA';
            case 'ANGER': return 'ANG';
            default: return 'MOD';
        }
    }

    /**
     * Helper method to find unit by ID using the global unit registry
     */
    private static findUnitById(unitId: string): Unit | null {
        const unit = globalUnitRegistry.findUnitById(unitId);
        if (!unit) {
            console.warn(`⚠️ Unit not found for ID: ${unitId}`);
        }
        return unit || null;
    }
} 