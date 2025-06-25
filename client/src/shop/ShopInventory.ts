import { Unit } from '../units/Unit';
import { UNIT_DEX } from '../units/UnitDex';
import { globalUnitFactory } from '../units/UnitFactory';
import { globalUnitRegistry } from '../units/UnitRegistry';

// Define a type for what a shop slot can display
export type ShopDisplayItem = Unit | { sold: true, originalUnit: Unit } | null;

let shopNeedsInitialPopulation = true; // Flag to control shop refresh
// This array holds the state of what's displayed in each of the 3 shop slots
let currentShopDisplayItems: ShopDisplayItem[] = [null, null, null];

export function markShopForNextVisitRefresh(): void {
    shopNeedsInitialPopulation = true;
    currentShopDisplayItems = [null, null, null]; // Reset display items too
}

export function getCurrentShopDisplayItems(): ShopDisplayItem[] {
    return currentShopDisplayItems;
}

export function updateShopDisplayItem(index: number, item: ShopDisplayItem): void {
    if (index >= 0 && index < currentShopDisplayItems.length) {
        currentShopDisplayItems[index] = item;
    }
}

export function ensureShopUnitsPopulated(): void {
    if (shopNeedsInitialPopulation) {
        console.log('Shop requires fresh population. Clearing and generating units...');
        globalUnitRegistry.shopUnits = []; // Clear existing shop units
        currentShopDisplayItems = [null, null, null]; // Clear display items

        const availableUnitTypeNames = Object.keys(UNIT_DEX);
        if (availableUnitTypeNames.length === 0) {
            console.error("No unit types defined in UNIT_DEX for the shop!");
            shopNeedsInitialPopulation = false; 
            return;
        }

        const typesAlreadyInShop: string[] = [];
        for (let i = 0; i < 3; i++) {
            if (availableUnitTypeNames.length === 0) break; // No more types to pick from
            
            let unitTypeName: string;
            let attempts = 0;
            const maxAttempts = availableUnitTypeNames.length * 2; // Safety break

            do {
                const randomIndex = Math.floor(Math.random() * availableUnitTypeNames.length);
                unitTypeName = availableUnitTypeNames[randomIndex];
                attempts++;
            } while (typesAlreadyInShop.includes(unitTypeName) && availableUnitTypeNames.length > typesAlreadyInShop.length && attempts < maxAttempts);
            // If all available types are already in shop OR max attempts reached, it might pick a duplicate or the last available unique type.
            
            typesAlreadyInShop.push(unitTypeName); // Add to list even if it's a duplicate in some edge cases
            const instance = globalUnitFactory.createUnit(unitTypeName);
            if (instance) {
                globalUnitRegistry.addUnitToShop(instance); // Actual available units
                currentShopDisplayItems[i] = instance;    // What to display in the slot
            }
        }
        shopNeedsInitialPopulation = false; 
    } else {
        console.log('Shop already populated for this session. Using existing display items.');
    }
} 