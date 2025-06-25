import { Globe, BattleCondition, GlobeReward } from './Globe';
import { globalUnitFactory } from '../units/UnitFactory';

// Define battle conditions
const BATTLE_CONDITIONS: { [key: string]: BattleCondition } = {
    NORMAL: {
        name: "Standard Battle",
        description: "A standard battle with no special conditions.",
        effect: () => {} // No effect
    }
};

// Define rewards
const REWARDS: { [key: string]: GlobeReward } = {
    STANDARD: { resource: 10 }
};

// Helper function to create enemy units
function createEnemyUnit(unitType: string) {
    const unit = globalUnitFactory.createUnit(unitType, 'enemy');
    if (!unit) {
        console.error(`Failed to create enemy unit of type ${unitType}`);
        return null;
    }
    return unit;
}

// Create the GlobeDex
export const GLOBE_DEX: { [key: string]: Globe } = {
    "STANDARD_GLOBE": new Globe(
        "STANDARD_GLOBE",
        "Standard Globe",
        1,
        "/assets/Images/standardglobe.png",
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [createEnemyUnit("Swordsman")!]
    ),
    "NEON_REALM": new Globe(
        "NEON_REALM",
        "Neon Realm",
        1,
        "/assets/Images/neonrealm.png",
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [createEnemyUnit("Swordsman")!]
    ),
    "WORMWOOD_CASTLE": new Globe(
        "WORMWOOD_CASTLE",
        "Wormwood Castle",
        1,
        "/assets/Images/wormwoodcastle.png",
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [createEnemyUnit("Swordsman")!]
    ),
    "TEMPLE_OF_RELICS": new Globe(
        "TEMPLE_OF_RELICS",
        "Temple of Relics",
        1,
        "/assets/Images/templeofrelics.png",
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [
            createEnemyUnit("Swordsman")!,
            createEnemyUnit("Swordsman")!
        ]
    ),
    "CAVE": new Globe(
        "CAVE",
        "Cave",
        1,
        "/assets/Images/cave.png",
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [createEnemyUnit("Swordsman")!]
    ),
    "FOREST": new Globe(
        "FOREST",
        "Forest",
        1,
        "/assets/Images/forest.png",
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [createEnemyUnit("Swordsman")!]
    )
};

// Helper function to get random globes of a specific level
export function getRandomGlobes(level: number, count: number = 3): Globe[] {
    const levelGlobes = Object.values(GLOBE_DEX).filter(globe => globe.level === level);
    const shuffled = [...levelGlobes].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
} 