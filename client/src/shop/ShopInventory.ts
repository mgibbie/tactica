import { Unit } from '../units/Unit';
import { UNIT_DEX } from '../units/UnitDex';
import { globalUnitFactory } from '../units/UnitFactory';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { Item } from '../items/Item';
import { ITEM_DEX } from '../items/ItemDex';
import { globalItemFactory } from '../items/ItemFactory';

// Define a type for what a shop slot can display
export type ShopDisplayItem = Unit | { sold: true, originalUnit: Unit } | null;
export type ShopDisplayItemSlot = Item | { sold: true, originalItem: Item } | null;

let shopNeedsInitialPopulation = true; // Flag to control shop refresh
// This array holds the state of what's displayed in each of the 3 unit slots
let currentShopDisplayItems: ShopDisplayItem[] = [null, null, null];
// This array holds the state of what's displayed in each of the 2 item slots  
let currentShopItemSlots: ShopDisplayItemSlot[] = [null, null];

export function markShopForNextVisitRefresh(): void {
    shopNeedsInitialPopulation = true;
    currentShopDisplayItems = [null, null, null]; // Reset unit display items
    currentShopItemSlots = [null, null]; // Reset item display slots
}

export function getCurrentShopDisplayItems(): ShopDisplayItem[] {
    return currentShopDisplayItems;
}

export function getCurrentShopItemSlots(): ShopDisplayItemSlot[] {
    return currentShopItemSlots;
}

export function updateShopDisplayItem(index: number, item: ShopDisplayItem): void {
    if (index >= 0 && index < currentShopDisplayItems.length) {
        currentShopDisplayItems[index] = item;
    }
}

export function updateShopItemSlot(index: number, item: ShopDisplayItemSlot): void {
    if (index >= 0 && index < currentShopItemSlots.length) {
        currentShopItemSlots[index] = item;
    }
}

export function ensureShopPopulated(): void {
    if (shopNeedsInitialPopulation) {
        console.log('Shop requires fresh population. Clearing and generating units and items...');
        
        // Clear existing shop inventory
        globalUnitRegistry.shopUnits = [];
        globalUnitRegistry.shopItems = [];
        currentShopDisplayItems = [null, null, null];
        currentShopItemSlots = [null, null];

        // Populate units
        const availableUnitTypeNames = Object.keys(UNIT_DEX);
        if (availableUnitTypeNames.length === 0) {
            console.error("No unit types defined in UNIT_DEX for the shop!");
        } else {
            const typesAlreadyInShop: string[] = [];
            for (let i = 0; i < 3; i++) {
                if (availableUnitTypeNames.length === 0) break;
                
                let unitTypeName: string;
                let attempts = 0;
                const maxAttempts = availableUnitTypeNames.length * 2;

                do {
                    const randomIndex = Math.floor(Math.random() * availableUnitTypeNames.length);
                    unitTypeName = availableUnitTypeNames[randomIndex];
                    attempts++;
                } while (typesAlreadyInShop.includes(unitTypeName) && availableUnitTypeNames.length > typesAlreadyInShop.length && attempts < maxAttempts);
                
                typesAlreadyInShop.push(unitTypeName);
                const instance = globalUnitFactory.createUnit(unitTypeName);
                if (instance) {
                    globalUnitRegistry.addUnitToShop(instance);
                    currentShopDisplayItems[i] = instance;
                }
            }
        }

        // Populate items (all available items)
        const availableItemTypeNames = Object.keys(ITEM_DEX);
        if (availableItemTypeNames.length === 0) {
            console.error("No item types defined in ITEM_DEX for the shop!");
        } else {
            for (let i = 0; i < Math.min(2, availableItemTypeNames.length); i++) {
                const itemTypeName = availableItemTypeNames[i];
                const itemInstance = globalItemFactory.createItem(itemTypeName);
                if (itemInstance) {
                    globalUnitRegistry.addItemToShop(itemInstance);
                    currentShopItemSlots[i] = itemInstance;
                }
            }
        }

        shopNeedsInitialPopulation = false; 
    } else {
        console.log('Shop already populated for this session. Using existing display items and item slots.');
    }
}

// Keep the old function name for compatibility
export function ensureShopUnitsPopulated(): void {
    ensureShopPopulated();
} 