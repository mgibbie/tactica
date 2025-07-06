import { ItemStats } from './Item';
import rareCandyImg from '../assets/Images/RARECANDY.png';
import energyPowderImg from '../assets/Images/ENERGYPOWDER.png';
import { Unit } from '../units/Unit';

export const ITEM_DEX: Record<string, ItemStats> = {
    "rare-candy": {
        name: "Rare Candy",
        description: "Causes a unit to level up, increasing all stats",
        cost: 1,
        imageUrl: rareCandyImg,
        type: 'consumable',
        effect: (unit: Unit) => {
            // Level up effect: increase key stats
            const healthIncrease = 3;
            const energyIncrease = 2;
            const damageIncrease = 1;
            
            // Increase max stats
            unit.health += healthIncrease;
            unit.maxEnergy += energyIncrease;
            unit.basicDamage += damageIncrease;
            unit.skillDamage += damageIncrease;
            
            // Increase level
            unit.level += 1;
            
            // Restore current health to new max
            unit.currentHealth = unit.health;
            
            console.log(`🍬 ${unit.name} leveled up to level ${unit.level}! Health: +${healthIncrease}, Energy: +${energyIncrease}, Damage: +${damageIncrease}`);
            return true; // Item was successfully used
        }
    },
    "energy-powder": {
        name: "Energy Powder",
        description: "Permanently increases a unit's movement by 1",
        cost: 1,
        imageUrl: energyPowderImg,
        type: 'consumable',
        effect: (unit: Unit) => {
            // Increase movement permanently
            const moveIncrease = 1;
            unit.move += moveIncrease;
            
            console.log(`⚡ ${unit.name} gained ${moveIncrease} movement! New movement: ${unit.move}`);
            return true; // Item was successfully used
        }
    }
}; 