import { Globe, BattleCondition, GlobeReward } from './Globe';
import { globalUnitFactory } from '../units/UnitFactory';
import standardGlobe from "../assets/Images/standardglobe.png";
import neonRealm from "../assets/Images/neonrealm.png";
import wormwoodCastle from "../assets/Images/wormwoodcastle.png";
import templeOfRelics from "../assets/Images/templeofrelics.png";
import cave from "../assets/Images/cave.png";
import forest from "../assets/Images/forest.png";

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
export const GLOBE_REGISTRY: Globe[] = [
    new Globe(
        "standard-globe",
        "Standard Globe",
        1,
        standardGlobe,
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [createEnemyUnit("Swordsman")!]
    ),
    new Globe(
        "neon-realm",
        "Neon Realm",
        1,
        neonRealm,
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [createEnemyUnit("Swordsman")!]
    ),
    new Globe(
        "wormwood-castle",
        "Wormwood Castle",
        1,
        wormwoodCastle,
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [createEnemyUnit("Swordsman")!]
    ),
    new Globe(
        "temple-of-relics",
        "Temple of Relics",
        1,
        templeOfRelics,
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [
            createEnemyUnit("Healer")!,
            createEnemyUnit("Hater")!
        ]
    ),
    new Globe(
        "the-caves",
        "Cave",
        1,
        cave,
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [createEnemyUnit("Swordsman")!]
    ),
    new Globe(
        "the-forest",
        "Forest",
        1,
        forest,
        REWARDS.STANDARD,
        BATTLE_CONDITIONS.NORMAL,
        [createEnemyUnit("Swordsman")!]
    )
];

// Helper function to get random globes of a specific level
export function getRandomGlobes(level: number, count: number = 3): Globe[] {
    const levelGlobes = GLOBE_REGISTRY.filter(globe => globe.level === level);
    const shuffled = [...levelGlobes].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
