import { Unit } from '../units/Unit';

export interface Item {
    id: string; // Unique identifier for the instance
    name: string; // Display name
    description: string; // What the item does
    cost: number; // Resource cost to purchase
    imageUrl: string; // Path to the item's visual representation
    type: 'consumable' | 'permanent'; // Type of item effect
    
    // Function that applies the item's effect to a unit
    // Returns true if the item was successfully used, false otherwise
    effect: (unit: Unit) => boolean;
}

export interface ItemStats { // Base stats for a type of item
    name: string; // Item type name, e.g., "Rare Candy"
    description: string; // What the item does
    cost: number; // Resource cost to purchase
    imageUrl: string; // Path to the item's image
    type: 'consumable' | 'permanent'; // Type of item effect
    
    // Function that defines the item's effect
    effect: (unit: Unit) => boolean;
} 