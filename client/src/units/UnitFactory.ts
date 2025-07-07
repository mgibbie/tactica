import { Unit, UnitStats } from './Unit';
import { UNIT_DEX } from './UnitDex';
import { globalUnitRegistry, UnitRegistry } from './UnitRegistry'; // Using the global instance for now
import { SKILL_REGISTRY } from './Skill';

// List of possible names for units
const POSSIBLE_NAMES: string[] = [
    "Mike", "Bryan", "Matt", "Gabe", "Waylin", "Axel", "Laharl", "Steve", 
    "Garrison", "Sock", "Franz", "Edgar", "Dan", "Frank", "Keyboard", "Justin", 
    "Jack", "Ned", "Elliot", "Sam", "Alex", "Jackson", "Kyle", "Don Julio", 
    "Derek", "Peter", "Herbert", "Liam", "Arthur", "Gavin", "Dylan", "Kieran","Romulus"
];

// Simple ID generator, consider using a more robust UUID library for production
let nextUnitId = 1;
function generateUnitId(): string {
    return `unit-${nextUnitId++}`;
}

function getRandomName(): string {
    const randomIndex = Math.floor(Math.random() * POSSIBLE_NAMES.length);
    return POSSIBLE_NAMES[randomIndex];
}

export class UnitFactory {
    private registry: UnitRegistry;

    constructor(registry: UnitRegistry) {
        this.registry = registry;
    }

    createUnit(unitTypeName: string, team: 'player' | 'enemy' = 'player'): Unit | null {
        const unitStats: UnitStats | undefined = UNIT_DEX[unitTypeName];

        if (!unitStats) {
            console.error(`Unit type "${unitTypeName}" not found in UnitDex.`);
            return null;
        }

        // Initialize energy based on energy type
        let initialEnergy: number;
        if (unitStats.energyType.toLowerCase() === 'potential') {
            // Potential energy units start at max energy
            initialEnergy = unitStats.maxEnergy;
        } else if (unitStats.energyType.toLowerCase() === 'kinetic') {
            // Kinetic energy units start at 0 energy
            initialEnergy = 0;
        } else {
            // Default behavior for unknown energy types
            console.warn(`Unknown energy type "${unitStats.energyType}" for unit "${unitTypeName}". Defaulting to max energy.`);
            initialEnergy = unitStats.maxEnergy;
        }

        // Convert skill IDs to actual Skill objects
        const skills = unitStats.skills.map(skillId => SKILL_REGISTRY[skillId]).filter(skill => skill !== undefined);

        const newUnit: Unit = {
            id: generateUnitId(),
            name: getRandomName(), // Assign a random personal name
            className: unitStats.name, // Assign class name from UnitStats
            energyType: unitStats.energyType,
            health: unitStats.health,
            currentHealth: unitStats.health, // Start with full health
            maxEnergy: unitStats.maxEnergy,
            currentEnergy: initialEnergy, // Energy based on energy type
            basicDamage: unitStats.basicDamage,
            skillDamage: unitStats.skillDamage,
            range: unitStats.range,
            move: unitStats.move,
            cost: unitStats.cost, // Assign cost from UnitStats
            imageUrl: unitStats.imageUrl,
            skills: skills, // Convert skill IDs to Skill objects
            activeModifiers: [], // Initialize with empty modifiers
            team: team, // Set the team
            level: 1, // All units start at level 1
            perkPoints: 0, // Start with no perk points
            purchasedPerks: [], // Start with no purchased perks
            
            // Initialize new boolean fields
            isAlive: true, // True at initialization
            turnTakenThisRound: false, // False at initialization
            isTargetable: true, // True at initialization
            isDestructible: true, // True at initialization
            isSubUnit: false, // False at initialization
            isStructure: false // False at initialization
        };

        console.log(`Created unit: ${newUnit.name} (${newUnit.className}) (ID: ${newUnit.id}) - Cost: ${newUnit.cost} - Energy: ${newUnit.currentEnergy}/${newUnit.maxEnergy} (${newUnit.energyType})`);
        // Note: The factory itself doesn't automatically add to a specific category in the registry.
        // That will be the responsibility of the code calling the factory.
        // However, it could be designed to do so if preferred.
        // For now, let's have a method to create and add to a default category, e.g. storage
        // Or a method to just return the unit to be added manually.

        return newUnit;
    }

    // Example method to create and add to player party directly
    createAndAddUnitToPlayerParty(unitTypeName: string): Unit | null {
        const unit = this.createUnit(unitTypeName);
        if (unit) {
            this.registry.addUnitToPlayerParty(unit);
        }
        return unit;
    }
}

// Example of using a global registry instance if that's the desired pattern
export const globalUnitFactory = new UnitFactory(globalUnitRegistry);

// Example usage (you would call this from your game logic):
/*
const swordsman = globalUnitFactory.createUnit("Swordsman");
if (swordsman) {
    globalUnitRegistry.addUnitToPlayerParty(swordsman);
}

const anotherSwordsman = globalUnitFactory.createAndAddUnitToPlayerParty("Swordsman");
*/ 