import { Unit } from '../units/Unit';
import { ModifierService } from './ModifierService';
import { globalUnitRegistry } from '../units/UnitRegistry';

export class PassiveService {
    
    /**
     * Process skip action passives for a unit
     * This should be called when a unit skips their action phase
     */
    public static processSkipActionPassives(unit: Unit): void {
        if (!unit.passives || unit.passives.length === 0) {
            return;
        }
        
        console.log(`⏭️ Processing skip action passives for ${unit.name}...`);
        
        for (const passive of unit.passives) {
            switch (passive.id) {
                case 'stoic':
                    this.processStoicPassive(unit);
                    break;
                // Add other passives here as they are implemented
                default:
                    console.warn(`⚠️ Unknown passive: ${passive.id}`);
                    break;
            }
        }
    }
    
    /**
     * Process the Stoic passive: Gain 2 Counter when skipping action phase
     */
    private static processStoicPassive(unit: Unit): void {
        console.log(`🛡️ ${unit.name} triggers Stoic passive - gaining 2 Counter for skipping action`);
        
        // Apply 2 Counter modifier
        const success = ModifierService.applyModifier(unit, 'COUNTER', 2, unit.id);
        
        if (success) {
            console.log(`✅ ${unit.name} gained 2 Counter from Stoic passive`);
        } else {
            console.error(`❌ Failed to apply Counter modifier to ${unit.name} from Stoic passive`);
        }
    }
    

}
