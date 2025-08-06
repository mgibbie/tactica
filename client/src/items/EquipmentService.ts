import { Unit } from '../units/Unit';
import { Item } from './Item';
import { ITEM_DEX } from './ItemDex';

export class EquipmentService {
    
    /**
     * Equip an item to a unit
     * @param unit The unit to equip the item to
     * @param itemId The ID of the item to equip
     * @returns true if successful, false otherwise
     */
    static equipItem(unit: Unit, itemId: string): boolean {
        const itemStats = ITEM_DEX[itemId];
        if (!itemStats) {
            console.error(`Item "${itemId}" not found in ItemDex`);
            return false;
        }
        
        if (itemStats.type !== 'equipment') {
            console.error(`Item "${itemId}" is not equipment`);
            return false;
        }
        
        if (unit.heldItem !== null) {
            console.log(`❌ ${unit.name} already has an item equipped: ${unit.heldItem}`);
            return false;
        }
        
        // Equip the item
        unit.heldItem = itemId;
        
        // Call the onEquip function if it exists
        if (itemStats.onEquip) {
            itemStats.onEquip(unit);
        }
        
        console.log(`✅ ${unit.name} equipped ${itemStats.name}`);
        return true;
    }
    
    /**
     * Unequip an item from a unit
     * @param unit The unit to unequip the item from
     * @returns the ID of the unequipped item, or null if no item was equipped
     */
    static unequipItem(unit: Unit): string | null {
        if (unit.heldItem === null) {
            console.log(`❌ ${unit.name} has no item equipped`);
            return null;
        }
        
        const itemId = unit.heldItem;
        const itemStats = ITEM_DEX[itemId];
        
        // Unequip the item
        unit.heldItem = null;
        
        // Call the onUnequip function if it exists
        if (itemStats && itemStats.onUnequip) {
            itemStats.onUnequip(unit);
        }
        
        console.log(`✅ ${unit.name} unequipped ${itemStats?.name || itemId}`);
        return itemId;
    }
    
    /**
     * Get the held item stats for a unit
     * @param unit The unit to check
     * @returns the item stats or null if no item is held
     */
    static getHeldItemStats(unit: Unit) {
        if (unit.heldItem === null) {
            return null;
        }
        
        return ITEM_DEX[unit.heldItem] || null;
    }
    
    /**
     * Calculate skill damage bonus from held items
     * @param unit The unit to check
     * @returns the skill damage bonus from held items
     */
    static getSkillDamageBonus(unit: Unit): number {
        if (unit.heldItem === null) {
            return 0;
        }
        
        // For now, only Ruby gives skill damage bonus
        if (unit.heldItem === 'ruby') {
            return 1;
        }
        
        return 0;
    }
    
    /**
     * Calculate basic damage bonus from held items
     * @param unit The unit to check
     * @returns the basic damage bonus from held items
     */
    static getBasicDamageBonus(unit: Unit): number {
        if (unit.heldItem === null) {
            return 0;
        }
        
        // No held items currently give basic damage bonus
        return 0;
    }
    
    /**
     * Calculate move range bonus from held items
     * @param unit The unit to check
     * @returns the move range bonus from held items
     */
    static getMoveBonus(unit: Unit): number {
        if (unit.heldItem === null) {
            return 0;
        }
        
        // Sapphire gives move range bonus
        if (unit.heldItem === 'sapphire') {
            return 1;
        }
        
        return 0;
    }
}