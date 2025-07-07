import { ActiveModifier } from './Modifier';
import { Skill } from './Skill';

export interface Unit {
    id: string; // Unique identifier for the instance
    name: string; // Randomly assigned personal name, e.g., "Mike"
    className: string; // Type of unit, e.g., "Swordsman"
    energyType: string;
    health: number;
    currentHealth: number; // Current health, can be different from max health
    maxEnergy: number;
    currentEnergy: number; // Current energy
    basicDamage: number;
    skillDamage: number;
    range: number;
    move: number;
    cost: number; // Cost to acquire/deploy the unit
    imageUrl: string; // Path or URL to the unit's visual representation
    skills: Skill[]; // Skills this unit can use
    activeModifiers: ActiveModifier[];
    team: 'player' | 'enemy'; // Which team the unit belongs to
    level: number; // Unit level (starts at 1, increases with Rare Candy)
    perkPoints: number; // Points available to spend on perks
    purchasedPerks: string[]; // IDs of perks this unit has purchased
    
    // New boolean fields
    isAlive: boolean; // True at initialization, false when unit dies
    turnTakenThisRound: boolean; // False at initialization, true after taking turn
    isTargetable: boolean; // True at initialization
    isDestructible: boolean; // True at initialization
    isSubUnit: boolean; // False at initialization
    isStructure: boolean; // False at initialization
    // Potentially add position, status effects, etc. later
}

export interface UnitStats { // Base stats for a type of unit
    name: string; // This is the class/type name, e.g., "Swordsman"
    energyType: string;
    health: number;
    maxEnergy: number;
    basicDamage: number;
    skillDamage: number;
    range: number;
    move: number;
    cost: number; // Cost to acquire/deploy the unit
    imageUrl: string;
    skills: string[]; // Skill IDs that units of this type have
} 