import { ItemStats } from './Item';
import rareCandyImg from '../assets/Images/RARECANDY.png';
import energyPowderImg from '../assets/Images/ENERGYPOWDER.png';
import { Unit } from '../units/Unit';
import { skillTreeScene } from '../units/SkillTreeScene';

export const ITEM_DEX: Record<string, ItemStats> = {
    "rare-candy": {
        name: "Rare Candy",
        description: "Causes a unit to level up and gain 1 perk point to spend on skills",
        cost: 1,
        imageUrl: rareCandyImg,
        type: 'consumable',
        effect: (unit: Unit) => {
            // Level up the unit
            unit.level += 1;
            
            // Give 1 perk point
            unit.perkPoints += 1;
            
            // Restore current health to full
            unit.currentHealth = unit.health;
            
            console.log(`🍬 ${unit.name} leveled up to level ${unit.level}! Gained 1 perk point. Total perk points: ${unit.perkPoints}`);
            
            // Open skill tree for the unit
            skillTreeScene.openSkillTree(unit, () => {
                console.log(`Skill tree closed for ${unit.name}`);
            });
            
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