import { Item, ItemStats } from './Item';
import { ITEM_DEX } from './ItemDex';

// Simple ID generator for items
let nextItemId = 1;
function generateItemId(): string {
    return `item-${nextItemId++}`;
}

export class ItemFactory {
    createItem(itemTypeName: string): Item | null {
        const itemStats: ItemStats | undefined = ITEM_DEX[itemTypeName];

        if (!itemStats) {
            console.error(`Item type "${itemTypeName}" not found in ItemDex.`);
            return null;
        }

        const newItem: Item = {
            id: generateItemId(),
            name: itemStats.name,
            description: itemStats.description,
            cost: itemStats.cost,
            imageUrl: itemStats.imageUrl,
            type: itemStats.type,
            effect: itemStats.effect
        };

        console.log(`Created item: ${newItem.name} (ID: ${newItem.id}) - Cost: ${newItem.cost}`);
        return newItem;
    }
}

// Global item factory instance
export const globalItemFactory = new ItemFactory(); 