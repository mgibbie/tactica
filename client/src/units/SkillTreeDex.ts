import { Unit } from './Unit';
import { SKILL_REGISTRY } from './Skill';

// Perk definition interface
export interface PerkDefinition {
    id: string;
    name: string;
    description: string;
    icon: string;
    row: number; // Which row (0 = top, 1 = second row, etc.)
    column: number; // Which column in the row
    unlockRequirements: string[]; // IDs of perks that must be purchased first
    effect: (unit: Unit) => void; // What happens when this perk is purchased
}

// Skill tree definition for a unit class
export interface SkillTreeDefinition {
    className: string;
    perks: PerkDefinition[];
}

// Skill tree database
export const SKILL_TREE_DEX: Record<string, SkillTreeDefinition> = {
    "Swordsman": {
        className: "Swordsman",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "swordsman-bandage",
                name: "Bandage",
                description: "Grants a healing skill to help survive tough battles. Costs 2 energy, heals (Skill Damage + 1) Health.",
                icon: "🩹",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['bandage'];
                    if (skill && !unit.skills.find(s => s.id === 'bandage')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Bandage skill!`);
                    }
                }
            },
            {
                id: "swordsman-prepare",
                name: "Prepare",
                description: "Grants the Prepare skill: Apply 1 stack of Strength (+1 Basic Attack damage) and 1 stack of Sturdy (-1 Basic Attack damage taken).",
                icon: "🛡️",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['prepare'];
                    if (skill && !unit.skills.find(s => s.id === 'prepare')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Prepare skill!`);
                    }
                }
            },
            {
                id: "swordsman-teleport",
                name: "Teleport",
                description: "Grants the ability to teleport 3 squares in any cardinal direction for 1 energy.",
                icon: "⚡",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['teleport'];
                    if (skill && !unit.skills.find(s => s.id === 'teleport')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Teleport skill!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "swordsman-disarming-slash",
                name: "Disarming Slash",
                description: "Deal (Skill Damage + 2), then apply 2 Weak to the target. Costs 4 energy.",
                icon: "🗡️",
                row: 1,
                column: 0,
                unlockRequirements: ["swordsman-bandage"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['disarming-slash'];
                    if (skill && !unit.skills.find(s => s.id === 'disarming-slash')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Disarming Slash!`);
                    }
                }
            },
            {
                id: "swordsman-inspiring-slash",
                name: "Inspiring Slash",
                description: "Deal (Skill Damage + 3) to an adjacent enemy, then grant 2 Strength to all adjacent allied units. Costs 4 energy.",
                icon: "⚔️",
                row: 1,
                column: 1,
                unlockRequirements: ["swordsman-prepare"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['inspiring-slash'];
                    if (skill && !unit.skills.find(s => s.id === 'inspiring-slash')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Inspiring Slash!`);
                    }
                }
            },
            {
                id: "swordsman-spring-slash",
                name: "Spring Slash",
                description: "Leap 2. Then deal (Skill Damage + 2) to an enemy exactly 3 squares away in a cardinal direction. Costs 4 energy.",
                icon: "🌸",
                row: 1,
                column: 2,
                unlockRequirements: ["swordsman-teleport"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['spring-slash'];
                    if (skill && !unit.skills.find(s => s.id === 'spring-slash')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Spring Slash!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "swordsman-revenge",
                name: "Revenge",
                description: "Apply 4 Counter to yourself. Costs 1 energy.",
                icon: "💀",
                row: 2,
                column: 0,
                unlockRequirements: ["swordsman-disarming-slash"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['revenge'];
                    if (skill && !unit.skills.find(s => s.id === 'revenge')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Revenge!`);
                    }
                }
            },
            {
                id: "swordsman-forceful-strike",
                name: "Forceful Strike",
                description: "Deal (Skill Damage + 1), push the target back 1 tile, and apply 1 Exposed. Costs 4 energy.",
                icon: "💥",
                row: 2,
                column: 1,
                unlockRequirements: ["swordsman-inspiring-slash"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['forceful-strike'];
                    if (skill && !unit.skills.find(s => s.id === 'forceful-strike')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Forceful Strike!`);
                    }
                }
            },
            {
                id: "swordsman-smoke-grenade",
                name: "Smoke Grenade",
                description: "Throw a smoke grenade up to range 3 in a cardinal direction, creating a Smoke Tile. Units ending their turn there gain +3 Sturdy and +3 Ward. Costs 2 energy.",
                icon: "💨",
                row: 2,
                column: 2,
                unlockRequirements: ["swordsman-spring-slash"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['smoke-grenade'];
                    if (skill && !unit.skills.find(s => s.id === 'smoke-grenade')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Smoke Grenade!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "swordsman-lifeblade",
                name: "Lifeblade",
                description: "Deal (Skill Damage + 3) to an adjacent enemy and apply 8 Leech to the target. Costs 8 energy.",
                icon: "❤️",
                row: 3,
                column: 0,
                unlockRequirements: ["swordsman-revenge"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['lifeblade'];
                    if (skill && !unit.skills.find(s => s.id === 'lifeblade')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Lifeblade!`);
                    }
                }
            },
            {
                id: "swordsman-overpierce",
                name: "Overpierce",
                description: "Piercing attack that hits 1, 2, and 3 tiles forward. Costs 7 energy and deals (Skill Damage + 3).",
                icon: "🗡️",
                row: 3,
                column: 1,
                unlockRequirements: ["swordsman-forceful-strike"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['overpierce'];
                    if (skill && !unit.skills.find(s => s.id === 'overpierce')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Overpierce!`);
                    }
                }
            },
            {
                id: "swordsman-teleport-slash",
                name: "Teleport Slash",
                description: "Teleport up to range 3, then deal (Skill Damage + 2) to all adjacent units (8-way) where you land. Costs 7 energy.",
                icon: "🌟",
                row: 3,
                column: 2,
                unlockRequirements: ["swordsman-smoke-grenade"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['teleport-slash'];
                    if (skill && !unit.skills.find(s => s.id === 'teleport-slash')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Teleport Slash!`);
                    }
                }
            }
        ]
    },
    "Healer": {
        className: "Healer",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "healer-universal-whisper",
                name: "Universal Whisper",
                description: "A gentle healing spell that restores health to allies.",
                icon: "🌟",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['universal-whisper'];
                    if (skill && !unit.skills.find(s => s.id === 'universal-whisper')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Universal Whisper skill!`);
                    }
                }
            },
            {
                id: "healer-healing-circle",
                name: "Healing Circle",
                description: "Creates a circle of healing energy that affects all cardinal directions around the target. Costs 6 energy, heals (Skill Damage + 3).",
                icon: "⭐",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['healing-circle'];
                    if (skill && !unit.skills.find(s => s.id === 'healing-circle')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Healing Circle skill!`);
                    }
                }
            },
            {
                id: "healer-beam",
                name: "Beam",
                description: "Focus energy into a concentrated beam that can target enemies 2 squares away in cardinal directions. Costs 2 energy, deals (Skill Damage + 2) damage.",
                icon: "✨",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['beam'];
                    if (skill && !unit.skills.find(s => s.id === 'beam')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Beam skill!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "healer-stars-blessing",
                name: "Star's Blessing",
                description: "Apply 5 Blessed and 5 Faith to an allied unit within range 2 (can target self). Costs 3 energy.",
                icon: "⭐",
                row: 1,
                column: 0,
                unlockRequirements: ["healer-universal-whisper"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['stars-blessing'];
                    if (skill && !unit.skills.find(s => s.id === 'stars-blessing')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Star's Blessing!`);
                    }
                }
            },
            {
                id: "healer-outburst",
                name: "Outburst",
                description: "Release a burst of healing energy that spreads outward.",
                icon: "💥",
                row: 1,
                column: 1,
                unlockRequirements: ["healer-healing-circle"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['outburst'];
                    if (skill && !unit.skills.find(s => s.id === 'outburst')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Outburst!`);
                    }
                }
            },
            {
                id: "healer-purifying-hand",
                name: "Purifying Hand",
                description: "Remove all modifiers from a target within range 1. Costs 6 energy.",
                icon: "🤲",
                row: 1,
                column: 2,
                unlockRequirements: ["healer-beam"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['purifying-hand'];
                    if (skill && !unit.skills.find(s => s.id === 'purifying-hand')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Purifying Hand!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "healer-finger-of-god",
                name: "Finger of God",
                description: "Heal a target within range 1 for (Skill Damage + 5). Costs 8 energy.",
                icon: "👆",
                row: 2,
                column: 0,
                unlockRequirements: ["healer-stars-blessing"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['finger-of-god'];
                    if (skill && !unit.skills.find(s => s.id === 'finger-of-god')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Finger of God!`);
                    }
                }
            },
            {
                id: "healer-star-song",
                name: "Star Song",
                description: "Heal all allies on the map for 3 (does not heal self). Costs 7 energy.",
                icon: "🎵",
                row: 2,
                column: 1,
                unlockRequirements: ["healer-outburst"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['star-song'];
                    if (skill && !unit.skills.find(s => s.id === 'star-song')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Star Song!`);
                    }
                }
            },
            {
                id: "healer-flash-of-sun",
                name: "Flash of Sun",
                description: "Apply 3 Blessed to all adjacent allies and 4 Burn to all adjacent enemies (8-way). Costs 4 energy.",
                icon: "☀️",
                row: 2,
                column: 2,
                unlockRequirements: ["healer-purifying-hand"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['flash-of-sun'];
                    if (skill && !unit.skills.find(s => s.id === 'flash-of-sun')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Flash of Sun!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "healer-aethers-grace",
                name: "Aether's Grace",
                description: "Restore (Skill Damage + 4) Health to an Allied Unit and Apply 4 Faith to it. Apply 4 Blessed to yourself. Range 4. Costs 10 energy.",
                icon: "🕊️",
                row: 3,
                column: 0,
                unlockRequirements: ["healer-finger-of-god"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['aethers-grace'];
                    if (skill && !unit.skills.find(s => s.id === 'aethers-grace')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Aether's Grace!`);
                    }
                }
            },
            {
                id: "healer-symphony",
                name: "Symphony",
                description: "Restore (Skill Damage) to all Allied Units within Range = 2. Apply 3 Headache to all Enemy Units within Range = 2. Costs 10 energy.",
                icon: "🎼",
                row: 3,
                column: 1,
                unlockRequirements: ["healer-star-song"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['symphony'];
                    if (skill && !unit.skills.find(s => s.id === 'symphony')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Symphony!`);
                    }
                }
            },
            {
                id: "healer-rescue",
                name: "Rescue",
                description: "Instantly transport and fully heal any ally in mortal danger.",
                icon: "🚑",
                row: 3,
                column: 2,
                unlockRequirements: ["healer-flash-of-sun"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['rescue'];
                    if (skill && !unit.skills.find(s => s.id === 'rescue')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Rescue!`);
                    }
                }
            }
        ]
    },
    "Hater": {
        className: "Hater",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "hater-toxic-cloud",
                name: "Toxic Cloud",
                description: "Grants the Toxic Cloud skill: Creates a line of 3 toxic tiles in front of you. Toxic tiles apply 1 Toxic to units that enter them, then disappear. Costs 4 energy.",
                icon: "☢️",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['toxic-cloud'];
                    if (skill && !unit.skills.find(s => s.id === 'toxic-cloud')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Toxic Cloud skill!`);
                    }
                }
            },
            {
                id: "hater-jeer",
                name: "Jeer",
                description: "Grants the Jeer skill: Apply 3 Exposed and 3 Weak to target enemy unit within range 3. Costs 2 energy.",
                icon: "😈",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['jeer'];
                    if (skill && !unit.skills.find(s => s.id === 'jeer')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Jeer skill!`);
                    }
                }
            },
            {
                id: "hater-exhaust",
                name: "Exhaust",
                description: "Grants the Exhaust skill: Apply 1 Weak, 1 Slow, and 1 Tired to target enemy unit within range 4. Costs 2 energy.",
                icon: "😴",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['exhaust'];
                    if (skill && !unit.skills.find(s => s.id === 'exhaust')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Exhaust skill!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "hater-poison-dart",
                name: "Poison Dart",
                description: "Grants the Poison Dart skill: Deal (Skill Damage + 2) to an enemy exactly 3 squares away in a cardinal direction and apply 2 Toxicity. Costs 5 energy.",
                icon: "🎯",
                row: 1,
                column: 0,
                unlockRequirements: ["hater-toxic-cloud"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['poison-dart'];
                    if (skill && !unit.skills.find(s => s.id === 'poison-dart')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Poison Dart skill!`);
                    }
                }
            },
            {
                id: "hater-outburst",
                name: "Outburst",
                description: "Grants the Outburst skill: Deal (Skill Damage - 1) to all adjacent Units and move them back 2 Tiles. Costs 4 energy.",
                icon: "🤬",
                row: 1,
                column: 1,
                unlockRequirements: ["hater-jeer"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['outburst'];
                    if (skill && !unit.skills.find(s => s.id === 'outburst')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Outburst skill!`);
                    }
                }
            },
            {
                id: "hater-distraction",
                name: "Distraction",
                description: "Grants the Distraction skill: Apply 2 Exposed and 2 Confusion to an enemy within Range = 3. Costs 2 energy.",
                icon: "🌀",
                row: 1,
                column: 2,
                unlockRequirements: ["hater-exhaust"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['distraction'];
                    if (skill && !unit.skills.find(s => s.id === 'distraction')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Distraction skill!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "hater-taunt",
                name: "Taunt",
                description: "Force enemies to attack you while reducing their damage.",
                icon: "🎭",
                row: 2,
                column: 0,
                unlockRequirements: ["hater-toxic-cloud"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['taunt'];
                    if (skill && !unit.skills.find(s => s.id === 'taunt')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Taunt skill!`);
                    }
                }
            },
            {
                id: "hater-back-off",
                name: "Back Off",
                description: "Grants the Back Off skill: Push an adjacent enemy 2 tiles directly away and apply 1 Slow. Costs 3 energy.",
                icon: "🚫",
                row: 2,
                column: 1,
                unlockRequirements: ["hater-outburst"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['back-off'];
                    if (skill && !unit.skills.find(s => s.id === 'back-off')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Back Off skill!`);
                    }
                }
            },
            {
                id: "hater-drain-punch",
                name: "Drain Punch",
                description: "Grants the Drain Punch skill: Deal (Skill Damage - 1) to an adjacent enemy, then apply 3 Leech and 3 Sap. Costs 4 energy.",
                icon: "🥊",
                row: 2,
                column: 2,
                unlockRequirements: ["hater-distraction"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['drain-punch'];
                    if (skill && !unit.skills.find(s => s.id === 'drain-punch')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Drain Punch skill!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "hater-toxic-king",
                name: "Toxic King",
                description: "Grants the Toxic King skill: Select an enemy anywhere. Create Toxic Tiles on all adjacent tiles around them (including under them) and on all adjacent tiles around yourself (not under you). Costs 9 energy.",
                icon: "👑",
                row: 3,
                column: 0,
                unlockRequirements: ["hater-taunt"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['toxic-king'];
                    if (skill && !unit.skills.find(s => s.id === 'toxic-king')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Toxic King skill!`);
                    }
                }
            },
            {
                id: "hater-psyche-break",
                name: "Psyche Break",
                description: "Grants the Psyche Break skill: Apply 4 Headache, 4 Confusion, and 4 Doubt to an enemy within Range = 2. Costs 9 energy.",
                icon: "💔",
                row: 3,
                column: 1,
                unlockRequirements: ["hater-back-off"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['psyche-break'];
                    if (skill && !unit.skills.find(s => s.id === 'psyche-break')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Psyche Break skill!`);
                    }
                }
            },
            {
                id: "hater-dizzy-slam",
                name: "Dizzy Slam",
                description: "Grants the Dizzy Slam skill: Leap 3, then deal (Skill Damage) damage to adjacent Enemy Units and apply 2 Confusion to them. Costs 8 energy.",
                icon: "🌪️",
                row: 3,
                column: 2,
                unlockRequirements: ["hater-drain-punch"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['dizzy-slam'];
                    if (skill && !unit.skills.find(s => s.id === 'dizzy-slam')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Dizzy Slam skill!`);
                    }
                }
            }
        ]
    },
    "Wizard": {
        className: "Wizard",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "wizard-flare-shot",
                name: "Flare Shot",
                description: "Grants the Flare Shot skill: Launch a flaming projectile that can hit targets exactly 3 squares away in any cardinal direction. Deals (Skill Damage) damage and inflicts 3 stacks of Burn. Costs 5 energy.",
                icon: "🔥",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['flare-shot'];
                    if (skill && !unit.skills.find(s => s.id === 'flare-shot')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Flare Shot skill!`);
                    }
                }
            },
            {
                id: "wizard-flare-up",
                name: "Flare Up",
                description: "Grants the Flare Up skill: Apply 3 Burn to an enemy unit within Range = 4. Costs 3 energy.",
                icon: "🔥",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['flare-up'];
                    if (skill && !unit.skills.find(s => s.id === 'flare-up')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Flare Up skill!`);
                    }
                }
            },
            {
                id: "wizard-splash",
                name: "Splash",
                description: "Grants the Splash skill: Launch a water projectile that can hit targets exactly 3 squares away in any cardinal direction. Deals (Skill Damage) damage and inflicts 2 stacks of Wet. Costs 6 energy.",
                icon: "💧",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['splash'];
                    if (skill && !unit.skills.find(s => s.id === 'splash')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Splash skill!`);
                    }
                }
            },
            {
                id: "wizard-spark-lance",
                name: "Spark Lance",
                description: "Grants the Spark Lance skill: Conjure a piercing lance of electrical energy that can hit targets exactly 4 squares away in any cardinal direction. Deals (Skill Damage - 2) damage and inflicts 2 stacks of Shocked. Costs 5 energy.",
                icon: "⚡",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['spark-lance'];
                    if (skill && !unit.skills.find(s => s.id === 'spark-lance')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Spark Lance skill!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "wizard-solar-ray",
                name: "Solar Ray",
                description: "Grants the Solar Ray skill: Deal (Skill Damage) to an Enemy Unit within Range = 3. Costs 7 energy.",
                icon: "☀️",
                row: 1,
                column: 0,
                unlockRequirements: ["wizard-flare-shot"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['solar-ray'];
                    if (skill && !unit.skills.find(s => s.id === 'solar-ray')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Solar Ray skill!`);
                    }
                }
            },
            {
                id: "wizard-comet-tail",
                name: "Comet Tail",
                description: "Grants the Comet Tail skill: Apply 1 Slow to units 1 and 2 tiles forward; deal (Skill Damage - 1) to the unit 3 tiles forward. Rotatable line. Costs 7 energy.",
                icon: "☄️",
                row: 1,
                column: 1,
                unlockRequirements: ["wizard-splash"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['comet-tail'];
                    if (skill && !unit.skills.find(s => s.id === 'comet-tail')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Comet Tail skill!`);
                    }
                }
            },
            {
                id: "wizard-cosmic-impact",
                name: "Cosmic Impact",
                description: "Grants the Cosmic Impact skill: Deal (Skill Damage + 2) to an enemy within Range = 1. Costs 7 energy.",
                icon: "🌌",
                row: 1,
                column: 2,
                unlockRequirements: ["wizard-spark-lance"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['cosmic-impact'];
                    if (skill && !unit.skills.find(s => s.id === 'cosmic-impact')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Cosmic Impact skill!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "wizard-flare-up",
                name: "Flare Up",
                description: "Cause existing fires to explode outward, spreading damage.",
                icon: "🌋",
                row: 2,
                column: 0,
                unlockRequirements: ["wizard-solar-ray"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Flare Up!`);
                }
            },
            {
                id: "wizard-divination",
                name: "Divination",
                description: "Grants the Divination skill: Apply 1 Focus and 5 Charge to yourself. Costs 2 energy.",
                icon: "🔮",
                row: 2,
                column: 1,
                unlockRequirements: ["wizard-comet-tail"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['divination'];
                    if (skill && !unit.skills.find(s => s.id === 'divination')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Divination skill!`);
                    }
                }
            },
            {
                id: "wizard-cauterize",
                name: "Cauterize",
                description: "Grants the Cauterize skill: Heal (Skill Damage) Health to an Allied Unit within Range = 2. Costs 4 energy.",
                icon: "🩸",
                row: 2,
                column: 2,
                unlockRequirements: ["wizard-cosmic-impact"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['cauterize'];
                    if (skill && !unit.skills.find(s => s.id === 'cauterize')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Cauterize skill!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "wizard-gaias-rage",
                name: "Gaia's Rage",
                description: "Grants Gaia's Rage: Deal (Skill Damage - 1) to all Enemy Units within Range = 2 and convert all tiles in range to Flame Tiles. Costs 11 energy.",
                icon: "🌍",
                row: 3,
                column: 0,
                unlockRequirements: ["wizard-flare-up"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['gaias-rage'];
                    if (skill && !unit.skills.find(s => s.id === 'gaias-rage')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Gaia's Rage skill!`);
                    }
                }
            },
            {
                id: "wizard-tidal-lock",
                name: "Tidal Lock",
                description: "Grants the Tidal Lock skill: Deal (Skill Damage - 2) to all Units within Range = 2 and apply 2 Wet and 2 Slow. Costs 11 energy.",
                icon: "🌊",
                row: 3,
                column: 1,
                unlockRequirements: ["wizard-divination"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['tidal-lock'];
                    if (skill && !unit.skills.find(s => s.id === 'tidal-lock')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Tidal Lock skill!`);
                    }
                }
            },
            {
                id: "wizard-plasma-tempest",
                name: "Plasma Tempest",
                description: "Grants Plasma Tempest: Apply 3 Charge to the Allied Unit 3 away in any cardinal direction and deal (Skill Damage - 1) to all Units within Range = 2 of it. Costs 10 energy.",
                icon: "🌪️",
                row: 3,
                column: 2,
                unlockRequirements: ["wizard-cauterize"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['plasma-tempest'];
                    if (skill && !unit.skills.find(s => s.id === 'plasma-tempest')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Plasma Tempest skill!`);
                    }
                }
            }
        ]
    },
    "Marksman": {
        className: "Marksman",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "marksman-lights-on",
                name: "Light's On",
                description: "Target 3 squares away in any cardinal direction to create a row of 3 spotlight tiles centered on that position. When enemies step on spotlights, you automatically attack them if in range. Costs 4 energy.",
                icon: "🔍",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['lights-on'];
                    if (skill && !unit.skills.find(s => s.id === 'lights-on')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Light's On skill!`);
                    }
                }
            },
            {
                id: "marksman-bandage",
                name: "Bandage",
                description: "Grants a healing skill to help survive tough battles. Costs 2 energy, heals (Skill Damage + 1) Health.",
                icon: "🩹",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['bandage'];
                    if (skill && !unit.skills.find(s => s.id === 'bandage')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Bandage skill!`);
                    }
                }
            },
            {
                id: "marksman-longshot",
                name: "Longshot",
                description: "Grants the Longshot skill: A precision shot that can hit targets 5 squares away in any cardinal direction. Costs 5 energy, deals (Skill Damage - 1) damage.",
                icon: "🎯",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['longshot'];
                    if (skill && !unit.skills.find(s => s.id === 'longshot')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Longshot skill!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "marksman-aim-high",
                name: "Aim High",
                description: "Grants the Aim High skill: Deal (Skill Damage + 2) to a target Enemy Unit 4 squares away in any cardinal direction and apply 2 Headache. Costs 5 energy.",
                icon: "🎪",
                row: 1,
                column: 0,
                unlockRequirements: ["marksman-lights-on"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['aim-high'];
                    if (skill && !unit.skills.find(s => s.id === 'aim-high')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Aim High skill!`);
                    }
                }
            },
            {
                id: "marksman-backflip",
                name: "Backflip",
                description: "Grants the Backflip skill: Leap 3 in any cardinal direction. Costs 2 energy.",
                icon: "🤸",
                row: 1,
                column: 1,
                unlockRequirements: ["marksman-bandage"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['backflip'];
                    if (skill && !unit.skills.find(s => s.id === 'backflip')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Backflip skill!`);
                    }
                }
            },
            {
                id: "marksman-zero-in",
                name: "Zero-In",
                description: "Grants the Zero In skill: Apply 1 Focus and 1 Strength to yourself. Costs 1 energy.",
                icon: "🔍",
                row: 1,
                column: 2,
                unlockRequirements: ["marksman-longshot"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['zero-in'];
                    if (skill && !unit.skills.find(s => s.id === 'zero-in')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Zero In!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "marksman-tracking-dart",
                name: "Tracking Dart",
                description: "Grants the Tracking Dart skill: Apply 4 Tired to the first enemy in a 3-tile forward line. Costs 3 energy.",
                icon: "🏹",
                row: 2,
                column: 0,
                unlockRequirements: ["marksman-aim-high"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['tracking-dart'];
                    if (skill && !unit.skills.find(s => s.id === 'tracking-dart')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Tracking Dart!`);
                    }
                }
            },
            {
                id: "marksman-flashbang",
                name: "Flashbang",
                description: "Grants the Flashbang skill: Apply 2 Exposed and 2 Confusion to all enemies within a 3x3 centered 3 tiles away in a cardinal direction. Costs 6 energy.",
                icon: "⚡",
                row: 2,
                column: 1,
                unlockRequirements: ["marksman-backflip"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['flashbang'];
                    if (skill && !unit.skills.find(s => s.id === 'flashbang')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Flashbang!`);
                    }
                }
            },
            {
                id: "marksman-aim-low",
                name: "Aim Low",
                description: "Grants the Aim Low skill: Deal (Skill Damage + 2) to a target Enemy Unit 3 away in any cardinal direction and apply 2 Slow. Costs 5 energy.",
                icon: "🦵",
                row: 2,
                column: 2,
                unlockRequirements: ["marksman-zero-in"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['aim-low'];
                    if (skill && !unit.skills.find(s => s.id === 'aim-low')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Aim Low!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "marksman-perimeter",
                name: "Perimeter",
                description: "Grants the Perimeter skill: Create a ring of Spotlight Tiles at Range 4 from this Unit. Costs 10 energy.",
                icon: "🛡️",
                row: 3,
                column: 0,
                unlockRequirements: ["marksman-tracking-dart"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['perimeter'];
                    if (skill && !unit.skills.find(s => s.id === 'perimeter')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Perimeter!`);
                    }
                }
            },
            {
                id: "marksman-hunker-down",
                name: "Hunker Down",
                description: "Grants the Hunker Down skill: Apply 2 Sturdy, 6 Wish, and 6 Charge to yourself. Costs 9 energy.",
                icon: "🏠",
                row: 3,
                column: 1,
                unlockRequirements: ["marksman-flashbang"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['hunker-down'];
                    if (skill && !unit.skills.find(s => s.id === 'hunker-down')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Hunker Down!`);
                    }
                }
            },
            {
                id: "marksman-overpierce",
                name: "Overpierce",
                description: "Attacks pierce through enemies to hit multiple targets.",
                icon: "🔥",
                row: 3,
                column: 2,
                unlockRequirements: ["marksman-aim-low"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['overpierce'];
                    if (skill && !unit.skills.find(s => s.id === 'overpierce')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Overpierce!`);
                    }
                }
            }
        ]
    },
    "Bannerman": {
        className: "Bannerman",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "bannerman-lead-the-charge",
                name: "Lead the Charge",
                description: "Rally allies and charge forward with increased damage and speed.",
                icon: "⚡",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['lead-the-charge'];
                    if (skill && !unit.skills.find(s => s.id === 'lead-the-charge')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Lead The Charge skill!`);
                    }
                }
            },
            {
                id: "bannerman-rally",
                name: "Rally",
                description: "Gather scattered allies and restore their fighting spirit.",
                icon: "📢",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['rally'];
                    if (skill && !unit.skills.find(s => s.id === 'rally')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Rally skill!`);
                    }
                }
            },
            {
                id: "bannerman-pierce",
                name: "Pierce",
                description: "Armor-piercing attack that ignores enemy defenses.",
                icon: "🗡️",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['pierce'];
                    if (skill && !unit.skills.find(s => s.id === 'pierce')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Pierce skill!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "bannerman-bash",
                name: "Bash",
                description: "Powerful shield bash that stuns enemies and creates openings.",
                icon: "🛡️",
                row: 1,
                column: 0,
                unlockRequirements: ["bannerman-lead-the-charge"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['bash'];
                    if (skill && !unit.skills.find(s => s.id === 'bash')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Bash!`);
                    }
                }
            },
            {
                id: "bannerman-outburst",
                name: "Outburst",
                description: "Explosive burst of energy that damages nearby enemies.",
                icon: "💥",
                row: 1,
                column: 1,
                unlockRequirements: ["bannerman-rally"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['outburst'];
                    if (skill && !unit.skills.find(s => s.id === 'outburst')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Outburst!`);
                    }
                }
            },
            {
                id: "bannerman-plant-the-flag",
                name: "Plant the Flag",
                description: "Plant a battle standard that provides massive area buffs.",
                icon: "🏴",
                row: 1,
                column: 2,
                unlockRequirements: ["bannerman-pierce"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Plant the Flag!`);
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "bannerman-peace-sign",
                name: "Peace Sign",
                description: "Diplomatic gesture that can calm hostile enemies or boost morale.",
                icon: "✌️",
                row: 2,
                column: 0,
                unlockRequirements: ["bannerman-bash"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Peace Sign!`);
                }
            },
            {
                id: "bannerman-whirlwind",
                name: "Whirlwind",
                description: "Spinning attack that hits all surrounding enemies.",
                icon: "🌪️",
                row: 2,
                column: 1,
                unlockRequirements: ["bannerman-outburst"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Whirlwind!`);
                }
            },
            {
                id: "bannerman-rescue",
                name: "Rescue",
                description: "Quickly move to aid fallen allies and restore them to fighting condition.",
                icon: "🚑",
                row: 2,
                column: 2,
                unlockRequirements: ["bannerman-plant-the-flag"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['rescue'];
                    if (skill && !unit.skills.find(s => s.id === 'rescue')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Rescue!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "bannerman-anthem",
                name: "Anthem",
                description: "Inspiring battle song that buffs all allies with courage and strength.",
                icon: "🎵",
                row: 3,
                column: 0,
                unlockRequirements: ["bannerman-peace-sign"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Anthem!`);
                }
            },
            {
                id: "bannerman-staccato",
                name: "Staccato",
                description: "Rapid series of precise strikes that build momentum.",
                icon: "🎼",
                row: 3,
                column: 1,
                unlockRequirements: ["bannerman-whirlwind"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Staccato!`);
                }
            },
            {
                id: "bannerman-redistribute",
                name: "Redistribute",
                description: "Share resources and abilities among all allies for optimal battlefield efficiency.",
                icon: "⚖️",
                row: 3,
                column: 2,
                unlockRequirements: ["bannerman-rescue"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Redistribute!`);
                }
            }
        ]
    },
    "Hype Man": {
        className: "Hype Man",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "hypeman-hype-up",
                name: "Hype Up",
                description: "Apply 1 Haste, 1 Strength, and 1 Focus to an Allied Unit within Range 4. Costs 2 energy.",
                icon: "🔥",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['hype-up'];
                    if (skill && !unit.skills.find(s => s.id === 'hype-up')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Hype Up!`);
                    }
                }
            },
            {
                id: "hypeman-steady-beat",
                name: "Steady Beat",
                description: "Apply 1 Sturdy, 1 Ward, 1 Counter, and 1 Mirror to an Allied Unit within Range 4. Costs 2 energy.",
                icon: "🥁",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['steady-beat'];
                    if (skill && !unit.skills.find(s => s.id === 'steady-beat')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Steady Beat!`);
                    }
                }
            },
            {
                id: "hypeman-outburst",
                name: "Outburst",
                description: "Deal (Skill Damage - 1) damage to all adjacent Units and move them back 2 Tiles. Costs 4 energy.",
                icon: "💥",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['outburst'];
                    if (skill && !unit.skills.find(s => s.id === 'outburst')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Outburst!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "hypeman-inspire-violence",
                name: "Inspire Violence",
                description: "Apply 4 Strength to an Allied Unit within Range = 2. Costs 8 energy.",
                icon: "⚔️",
                row: 1,
                column: 0,
                unlockRequirements: ["hypeman-hype-up"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['inspire-violence'];
                    if (skill && !unit.skills.find(s => s.id === 'inspire-violence')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Inspire Violence!`);
                    }
                }
            },
            {
                id: "hypeman-mirror-aegis",
                name: "Mirror Aegis",
                description: "Apply 7 Mirror to an Allied Unit within Range = 1. Costs 8 energy.",
                icon: "🛡️",
                row: 1,
                column: 1,
                unlockRequirements: ["hypeman-steady-beat"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['mirror-aegis'];
                    if (skill && !unit.skills.find(s => s.id === 'mirror-aegis')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Mirror Aegis!`);
                    }
                }
            },
            {
                id: "hypeman-peace-sign",
                name: "Peace Sign",
                description: "Apply 3 Wish and 3 Charge to an Allied Unit within Range = 4. Costs 3 energy.",
                icon: "✌️",
                row: 1,
                column: 2,
                unlockRequirements: ["hypeman-outburst"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['peace-sign'];
                    if (skill && !unit.skills.find(s => s.id === 'peace-sign')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Peace Sign!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "hypeman-idolize",
                name: "Idolize",
                description: "Select an Allied Unit anywhere on the map. Apply 3 Focus to it. Apply 4 Doubt to all enemies adjacent (8-way) to the target. Costs 12 energy.",
                icon: "⭐",
                row: 2,
                column: 0,
                unlockRequirements: ["hypeman-inspire-violence"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['idolize'];
                    if (skill && !unit.skills.find(s => s.id === 'idolize')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Idolize!`);
                    }
                }
            },
            {
                id: "hypeman-slip-counter",
                name: "Slip Counter",
                description: "Dodge incoming attacks with style and counter with a devastating riposte.",
                icon: "🤸",
                row: 2,
                column: 1,
                unlockRequirements: ["hypeman-mirror-aegis"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['slip-counter'];
                    if (skill && !unit.skills.find(s => s.id === 'slip-counter')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Slip Counter!`);
                    }
                }
            },
            {
                id: "hypeman-whirlwind",
                name: "Whirlwind",
                description: "Spin in a dazzling whirlwind that hits all surrounding enemies multiple times.",
                icon: "🌪️",
                row: 2,
                column: 2,
                unlockRequirements: ["hypeman-peace-sign"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['whirlwind'];
                    if (skill && !unit.skills.find(s => s.id === 'whirlwind')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Whirlwind!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate skills
            {
                id: "hypeman-call-to-action",
                name: "Call to Action",
                description: "Rally all allies with an inspiring call that grants extra actions and movement.",
                icon: "📢",
                row: 3,
                column: 0,
                unlockRequirements: ["hypeman-idolize"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['call-to-action'];
                    if (skill && !unit.skills.find(s => s.id === 'call-to-action')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Call to Action!`);
                    }
                }
            },
            {
                id: "hypeman-sound-barrier",
                name: "Sound Barrier",
                description: "Create a sonic barrier that blocks all incoming damage and pushes enemies away.",
                icon: "🔊",
                row: 3,
                column: 1,
                unlockRequirements: ["hypeman-slip-counter"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['sound-barrier'];
                    if (skill && !unit.skills.find(s => s.id === 'sound-barrier')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Sound Barrier!`);
                    }
                }
            },
            {
                id: "hypeman-symphony",
                name: "Symphony",
                description: "Conduct a magnificent symphony that harmonizes all battlefield energies into ultimate power.",
                icon: "🎼",
                row: 3,
                column: 2,
                unlockRequirements: ["hypeman-whirlwind"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['symphony'];
                    if (skill && !unit.skills.find(s => s.id === 'symphony')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Symphony!`);
                    }
                }
            }
        ]
    },
    "Shieldbearer": {
        className: "Shieldbearer",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "shieldbearer-rescue",
                name: "Rescue",
                description: "Rush to an ally's aid, pulling them to safety while blocking incoming attacks.",
                icon: "🚑",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['rescue'];
                    if (skill && !unit.skills.find(s => s.id === 'rescue')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Rescue!`);
                    }
                }
            },
            {
                id: "shieldbearer-get-sturdy",
                name: "Get Sturdy",
                description: "Brace yourself for impact, gaining damage resistance and stability against attacks.",
                icon: "🛡️",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['get-sturdy'];
                    if (skill && !unit.skills.find(s => s.id === 'get-sturdy')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Get Sturdy!`);
                    }
                }
            },
            {
                id: "shieldbearer-taunt",
                name: "Taunt",
                description: "Draw enemy attention and force them to focus their attacks on you instead of allies.",
                icon: "😤",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['taunt'];
                    if (skill && !unit.skills.find(s => s.id === 'taunt')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Taunt!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "shieldbearer-barricade",
                name: "Barricade",
                description: "Create a temporary defensive barrier that blocks enemy movement and projectiles.",
                icon: "🧱",
                row: 1,
                column: 0,
                unlockRequirements: ["shieldbearer-rescue"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['barricade'];
                    if (skill && !unit.skills.find(s => s.id === 'barricade')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Barricade!`);
                    }
                }
            },
            {
                id: "shieldbearer-shield-bash",
                name: "Shield Bash",
                description: "Strike with your shield to stun enemies and knock them back from their position.",
                icon: "💥",
                row: 1,
                column: 1,
                unlockRequirements: ["shieldbearer-get-sturdy"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['shield-bash'];
                    if (skill && !unit.skills.find(s => s.id === 'shield-bash')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Shield Bash!`);
                    }
                }
            },
            {
                id: "shieldbearer-bouncer",
                name: "Bouncer",
                description: "Deflect attacks back at enemies while maintaining your defensive stance.",
                icon: "↩️",
                row: 1,
                column: 2,
                unlockRequirements: ["shieldbearer-taunt"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['bouncer'];
                    if (skill && !unit.skills.find(s => s.id === 'bouncer')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Bouncer!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "shieldbearer-swap",
                name: "Swap",
                description: "Instantly switch positions with an ally, allowing for tactical repositioning.",
                icon: "🔄",
                row: 2,
                column: 0,
                unlockRequirements: ["shieldbearer-barricade"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['swap'];
                    if (skill && !unit.skills.find(s => s.id === 'swap')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Swap!`);
                    }
                }
            },
            {
                id: "shieldbearer-entrench",
                name: "Entrench",
                description: "Dig in and become immovable, gaining massive damage reduction but losing mobility.",
                icon: "⚓",
                row: 2,
                column: 1,
                unlockRequirements: ["shieldbearer-shield-bash"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['entrench'];
                    if (skill && !unit.skills.find(s => s.id === 'entrench')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Entrench!`);
                    }
                }
            },
            {
                id: "shieldbearer-phalanx",
                name: "Phalanx",
                description: "Form a defensive formation with nearby allies, sharing damage and increasing protection.",
                icon: "🏛️",
                row: 2,
                column: 2,
                unlockRequirements: ["shieldbearer-bouncer"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['phalanx'];
                    if (skill && !unit.skills.find(s => s.id === 'phalanx')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Phalanx!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate skills
            {
                id: "shieldbearer-the-wall",
                name: "The Wall",
                description: "Become an immovable object that completely blocks all damage and effects for allies behind you.",
                icon: "🏰",
                row: 3,
                column: 0,
                unlockRequirements: ["shieldbearer-swap"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['the-wall'];
                    if (skill && !unit.skills.find(s => s.id === 'the-wall')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned The Wall!`);
                    }
                }
            },
            {
                id: "shieldbearer-forceful-strike",
                name: "Forceful Strike",
                description: "Channel all your defensive power into a devastating counterattack that scales with damage taken.",
                icon: "⚡",
                row: 3,
                column: 1,
                unlockRequirements: ["shieldbearer-entrench"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['forceful-strike'];
                    if (skill && !unit.skills.find(s => s.id === 'forceful-strike')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Forceful Strike!`);
                    }
                }
            },
            {
                id: "shieldbearer-rock-solid",
                name: "Rock Solid",
                description: "Achieve perfect defensive mastery, becoming immune to all debuffs and gaining health regeneration.",
                icon: "💎",
                row: 3,
                column: 2,
                unlockRequirements: ["shieldbearer-phalanx"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['rock-solid'];
                    if (skill && !unit.skills.find(s => s.id === 'rock-solid')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Rock Solid!`);
                    }
                }
            }
        ]
    },
    "Salesman": {
        className: "Salesman",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "salesman-bash",
                name: "Bash",
                description: "Strike with your briefcase, dealing Skill Damage to adjacent target. Costs 2 energy.",
                icon: "💼",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['bash'];
                    if (skill && !unit.skills.find(s => s.id === 'bash')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Bash!`);
                    }
                }
            },
            {
                id: "salesman-switcheroo",
                name: "Switcheroo",
                description: "Swap equipped items with target unit (ally or enemy) within range 3. Costs 8 energy.",
                icon: "🔄",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['switcheroo'];
                    if (skill && !unit.skills.find(s => s.id === 'switcheroo')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Switcheroo!`);
                    }
                }
            },
            {
                id: "salesman-coin-toss",
                name: "Coin Toss",
                description: "Deal (Skill Damage + 4) damage to unit exactly 3 squares away in any cardinal direction. Start next Shop Phase with 1 less Resource. Costs 2 energy.",
                icon: "🪙",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['coin-toss'];
                    if (skill && !unit.skills.find(s => s.id === 'coin-toss')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Coin Toss!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "salesman-gift-of-the-void",
                name: "Gift of the Void",
                description: "Offer mysterious void-touched items that grant powerful but unpredictable effects.",
                icon: "🎁",
                row: 1,
                column: 0,
                unlockRequirements: ["salesman-bash"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['gift-of-the-void'];
                    if (skill && !unit.skills.find(s => s.id === 'gift-of-the-void')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Gift of the Void!`);
                    }
                }
            },
            {
                id: "salesman-flatten",
                name: "Flatten",
                description: "Crush opposition with the weight of bureaucracy and overwhelming paperwork.",
                icon: "📋",
                row: 1,
                column: 1,
                unlockRequirements: ["salesman-switcheroo"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['flatten'];
                    if (skill && !unit.skills.find(s => s.id === 'flatten')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Flatten!`);
                    }
                }
            },
            {
                id: "salesman-hired-help",
                name: "Hired Help",
                description: "Summon temporary mercenaries to assist in battle for a limited time.",
                icon: "👥",
                row: 1,
                column: 2,
                unlockRequirements: ["salesman-coin-toss"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['hired-help'];
                    if (skill && !unit.skills.find(s => s.id === 'hired-help')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Hired Help!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "salesman-deal-breaker",
                name: "Deal Breaker",
                description: "Cancel ongoing effects and contracts, disrupting enemy strategies and buffs.",
                icon: "❌",
                row: 2,
                column: 0,
                unlockRequirements: ["salesman-gift-of-the-void"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['deal-breaker'];
                    if (skill && !unit.skills.find(s => s.id === 'deal-breaker')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Deal Breaker!`);
                    }
                }
            },
            {
                id: "salesman-reinvigorate",
                name: "Reinvigorate",
                description: "Restore energy and vitality to allies through motivational sales techniques.",
                icon: "⚡",
                row: 2,
                column: 1,
                unlockRequirements: ["salesman-flatten"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['reinvigorate'];
                    if (skill && !unit.skills.find(s => s.id === 'reinvigorate')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Reinvigorate!`);
                    }
                }
            },
            {
                id: "salesman-private-practice",
                name: "Private Practice",
                description: "Establish exclusive services that provide ongoing benefits to selected allies.",
                icon: "🏢",
                row: 2,
                column: 2,
                unlockRequirements: ["salesman-hired-help"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['private-practice'];
                    if (skill && !unit.skills.find(s => s.id === 'private-practice')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Private Practice!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate skills
            {
                id: "salesman-transcendance",
                name: "Transcendance",
                description: "Achieve business enlightenment, transcending physical limitations and gaining cosmic insight.",
                icon: "🌟",
                row: 3,
                column: 0,
                unlockRequirements: ["salesman-deal-breaker"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['transcendance'];
                    if (skill && !unit.skills.find(s => s.id === 'transcendance')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Transcendance!`);
                    }
                }
            },
            {
                id: "salesman-knock-off",
                name: "Knock Off",
                description: "Create inferior copies of enemy abilities and items, weakening originals while gaining power.",
                icon: "📋",
                row: 3,
                column: 1,
                unlockRequirements: ["salesman-reinvigorate"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['knock-off'];
                    if (skill && !unit.skills.find(s => s.id === 'knock-off')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Knock Off!`);
                    }
                }
            },
            {
                id: "salesman-airstrike",
                name: "Airstrike",
                description: "Call in corporate air support for devastating area-of-effect bombardment.",
                icon: "✈️",
                row: 3,
                column: 2,
                unlockRequirements: ["salesman-private-practice"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['airstrike'];
                    if (skill && !unit.skills.find(s => s.id === 'airstrike')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Airstrike!`);
                    }
                }
            }
        ]
    },
    "Sigilbearer": {
        className: "Sigilbearer",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "sigilbearer-glass-floor",
                name: "Glass Floor",
                description: "Create a Glass Tile at \"Forward 1\", \"Forward 2\", and \"Forward 3\". Glass Tiles apply 1 Mirror to any Unit entering, starting or ending its Turn on them. Costs 7 energy.",
                icon: "🪟",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['glass-floor'];
                    if (skill && !unit.skills.find(s => s.id === 'glass-floor')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Glass Floor skill!`);
                    }
                }
            },
            {
                id: "sigilbearer-beam",
                name: "Beam",
                description: "Focus energy into a concentrated beam that can target enemies 2 squares away in cardinal directions. Costs 2 energy.",
                icon: "⚡",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['beam'];
                    if (skill && !unit.skills.find(s => s.id === 'beam')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Beam skill!`);
                    }
                }
            },
            {
                id: "sigilbearer-mist-spray",
                name: "Mist Spray",
                description: "Create 6 Mist Tiles on random tiles on the map. Mist Tiles apply 1 Ward to any Unit entering, starting or ending its Turn on them. Costs 2 energy.",
                icon: "🌫️",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['mist-spray'];
                    if (skill && !unit.skills.find(s => s.id === 'mist-spray')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Mist Spray skill!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "sigilbearer-reflect",
                name: "Reflect",
                description: "Apply Reflection buff for 3 turns. When attacked, reflect 50% damage back to attacker. Costs 2 energy.",
                icon: "🪞",
                row: 1,
                column: 0,
                unlockRequirements: ["sigilbearer-glass-floor"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['reflect'];
                    if (skill && !unit.skills.find(s => s.id === 'reflect')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Reflect skill!`);
                    }
                }
            },
            {
                id: "sigilbearer-primal-mark",
                name: "Primal Mark",
                description: "Mark an enemy with primal energy. Marked enemies take +3 damage from all sources for 4 turns. Costs 1 energy.",
                icon: "🎯",
                row: 1,
                column: 1,
                unlockRequirements: ["sigilbearer-beam"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['primal-mark'];
                    if (skill && !unit.skills.find(s => s.id === 'primal-mark')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Primal Mark skill!`);
                    }
                }
            },
            {
                id: "sigilbearer-mistwalk",
                name: "Mistwalk",
                description: "Dissolve into mist and teleport up to 4 squares away in any direction. Costs 2 energy.",
                icon: "👻",
                row: 1,
                column: 2,
                unlockRequirements: ["sigilbearer-mist-spray"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['mistwalk'];
                    if (skill && !unit.skills.find(s => s.id === 'mistwalk')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Mistwalk skill!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "sigilbearer-last-breath",
                name: "Last Breath",
                description: "Channel remaining life force into a devastating attack. Damage increases as health decreases. Costs 4 energy.",
                icon: "💨",
                row: 2,
                column: 0,
                unlockRequirements: ["sigilbearer-reflect"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['last-breath'];
                    if (skill && !unit.skills.find(s => s.id === 'last-breath')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Last Breath skill!`);
                    }
                }
            },
            {
                id: "sigilbearer-flatten",
                name: "Flatten",
                description: "Crush enemies in a line with overwhelming force. Hits all enemies 1, 2, and 3 squares away in target direction. Costs 3 energy.",
                icon: "🔨",
                row: 2,
                column: 1,
                unlockRequirements: ["sigilbearer-primal-mark"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['flatten'];
                    if (skill && !unit.skills.find(s => s.id === 'flatten')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Flatten skill!`);
                    }
                }
            },
            {
                id: "sigilbearer-mysticism",
                name: "Mysticism",
                description: "Enhance mystical powers, increasing skill damage by 2 and energy regeneration by 1 per turn for 5 turns. Costs 3 energy.",
                icon: "🔮",
                row: 2,
                column: 2,
                unlockRequirements: ["sigilbearer-mistwalk"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['mysticism'];
                    if (skill && !unit.skills.find(s => s.id === 'mysticism')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Mysticism skill!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "sigilbearer-mirrormancy",
                name: "Mirrormancy",
                description: "Create 2 mirror images that copy your next attack. Each image deals 50% damage. Costs 4 energy.",
                icon: "🪩",
                row: 3,
                column: 0,
                unlockRequirements: ["sigilbearer-last-breath"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['mirrormancy'];
                    if (skill && !unit.skills.find(s => s.id === 'mirrormancy')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Mirrormancy skill!`);
                    }
                }
            },
            {
                id: "sigilbearer-void-ray",
                name: "Void Ray",
                description: "Channel void energy into a piercing ray that hits all enemies in a line up to 5 squares away. Costs 5 energy.",
                icon: "🌌",
                row: 3,
                column: 1,
                unlockRequirements: ["sigilbearer-flatten"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['void-ray'];
                    if (skill && !unit.skills.find(s => s.id === 'void-ray')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Void Ray skill!`);
                    }
                }
            },
            {
                id: "sigilbearer-terraform",
                name: "Terraform",
                description: "Reshape the battlefield by creating impassable terrain walls or removing obstacles. Affects a 2x2 area. Costs 3 energy.",
                icon: "🏔️",
                row: 3,
                column: 2,
                unlockRequirements: ["sigilbearer-mysticism"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['terraform'];
                    if (skill && !unit.skills.find(s => s.id === 'terraform')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Terraform skill!`);
                    }
                }
            }
        ]
    },
    "Builder": {
        className: "Builder",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "builder-box-drop",
                name: "Box Drop",
                description: "Create a Box Structure (Health 4, all other stats 1) on an unoccupied tile within Range = 4. Costs 1 energy.",
                icon: "📦",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['box-drop'];
                    if (skill && !unit.skills.find(s => s.id === 'box-drop')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Box Drop skill!`);
                    }
                }
            },
            {
                id: "builder-deployable-spring",
                name: "Deployable Spring",
                description: "Place a spring trap that launches enemies 2 squares away when stepped on. Costs 3 energy.",
                icon: "🌀",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['deployable-spring'];
                    if (skill && !unit.skills.find(s => s.id === 'deployable-spring')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Deployable Spring skill!`);
                    }
                }
            },
            {
                id: "builder-create-turret",
                name: "Create Turret",
                description: "Create a Turret Structure (Health 5) with Sentry: Deal 1 damage to any Unit entering, starting, or ending its Turn within Range = 2. Costs 7 energy.",
                icon: "🔫",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['create-turret'];
                    if (skill && !unit.skills.find(s => s.id === 'create-turret')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Create Turret skill!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "builder-breaker",
                name: "Breaker",
                description: "Demolish walls, boxes, and other destructible terrain in a 2x2 area. Also damages enemies caught in the area. Costs 3 energy.",
                icon: "🔨",
                row: 1,
                column: 0,
                unlockRequirements: ["builder-box-drop"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['breaker'];
                    if (skill && !unit.skills.find(s => s.id === 'breaker')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Breaker skill!`);
                    }
                }
            },
            {
                id: "builder-forceful-strike",
                name: "Forceful Strike",
                description: "Powerful attack that can push enemies back and destroy obstacles. Costs 4 energy.",
                icon: "💥",
                row: 1,
                column: 1,
                unlockRequirements: ["builder-deployable-spring"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['forceful-strike'];
                    if (skill && !unit.skills.find(s => s.id === 'forceful-strike')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Forceful Strike skill!`);
                    }
                }
            },
            {
                id: "builder-substitution",
                name: "Substitution",
                description: "Instantly swap positions with any deployed box, turret, or trap you have placed. Costs 2 energy.",
                icon: "🔄",
                row: 1,
                column: 2,
                unlockRequirements: ["builder-create-turret"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['substitution'];
                    if (skill && !unit.skills.find(s => s.id === 'substitution')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Substitution skill!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "builder-bomb-drop",
                name: "Bomb Drop",
                description: "Deploy an explosive device that detonates after 1 turn, dealing damage in a 3x3 area. Costs 4 energy.",
                icon: "💣",
                row: 2,
                column: 0,
                unlockRequirements: ["builder-breaker"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['bomb-drop'];
                    if (skill && !unit.skills.find(s => s.id === 'bomb-drop')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Bomb Drop skill!`);
                    }
                }
            },
            {
                id: "builder-chaos-creation",
                name: "Chaos Creation",
                description: "Rapidly deploy 3 random objects (boxes, springs, or mini-turrets) in nearby squares. Costs 5 energy.",
                icon: "🎲",
                row: 2,
                column: 1,
                unlockRequirements: ["builder-forceful-strike"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['chaos-creation'];
                    if (skill && !unit.skills.find(s => s.id === 'chaos-creation')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Chaos Creation skill!`);
                    }
                }
            },
            {
                id: "builder-drone-clone",
                name: "Drone Clone",
                description: "Create a mechanical drone copy that can move and use basic attacks. Drone has 50% of your stats. Costs 6 energy.",
                icon: "🤖",
                row: 2,
                column: 2,
                unlockRequirements: ["builder-substitution"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['drone-clone'];
                    if (skill && !unit.skills.find(s => s.id === 'drone-clone')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Drone Clone skill!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "builder-boxed-in",
                name: "Boxed In",
                description: "Trap an enemy by surrounding them with indestructible walls for 3 turns. Walls form a 3x3 box around target. Costs 4 energy.",
                icon: "🗄️",
                row: 3,
                column: 0,
                unlockRequirements: ["builder-bomb-drop"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['boxed-in'];
                    if (skill && !unit.skills.find(s => s.id === 'boxed-in')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Boxed In skill!`);
                    }
                }
            },
            {
                id: "builder-sacrifice",
                name: "Sacrifice",
                description: "Destroy all your deployed objects to restore energy and gain temporary damage boost. Costs 1 energy.",
                icon: "⚡",
                row: 3,
                column: 1,
                unlockRequirements: ["builder-chaos-creation"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['sacrifice'];
                    if (skill && !unit.skills.find(s => s.id === 'sacrifice')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Sacrifice skill!`);
                    }
                }
            },
            {
                id: "builder-jirret-line",
                name: "Jirret Line",
                description: "Create a production line of 5 boxes in a straight line, each with different properties. Ultimate construction ability. Costs 7 energy.",
                icon: "🏭",
                row: 3,
                column: 2,
                unlockRequirements: ["builder-drone-clone"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['jirret-line'];
                    if (skill && !unit.skills.find(s => s.id === 'jirret-line')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Jirret Line skill!`);
                    }
                }
            }
        ]
    },
    "Rabbit Rider": {
        className: "Rabbit Rider",
        perks: [
            // Top row (Row 0) - Always available
            {
                id: "rabbitrider-glitch-strike",
                name: "Glitch Strike",
                description: "Deal (Skill Damage + 1) damage to an Enemy Unit within range 1. Apply 1 Glitched to the Enemy and 1 Glitched to yourself. Costs 4 energy.",
                icon: "⚡",
                row: 0,
                column: 0,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['glitch-strike'];
                    if (skill && !unit.skills.find(s => s.id === 'glitch-strike')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Glitch Strike skill!`);
                    }
                }
            },
            {
                id: "rabbitrider-bounce",
                name: "Bounce",
                description: "Leap 2 in a cardinal direction, deal Skill Damage to all adjacent enemy units at the landing spot, then leap 2 again in a cardinal direction. Costs 5 energy.",
                icon: "🏀",
                row: 0,
                column: 1,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['bounce'];
                    if (skill && !unit.skills.find(s => s.id === 'bounce')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Bounce skill!`);
                    }
                }
            },
            {
                id: "rabbitrider-gust-of-wind",
                name: "Gust of Wind",
                description: "Create a powerful gust that pushes enemies away and deals damage. Affects enemies in a line. Costs 2 energy.",
                icon: "🌪️",
                row: 0,
                column: 2,
                unlockRequirements: [],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['gust-of-wind'];
                    if (skill && !unit.skills.find(s => s.id === 'gust-of-wind')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Gust of Wind skill!`);
                    }
                }
            },
            // Second row (Row 1) - Requires top row perks
            {
                id: "rabbitrider-swap",
                name: "Swap",
                description: "Instantly swap positions with a target ally or enemy. Great for tactical repositioning. Costs 2 energy.",
                icon: "🔄",
                row: 1,
                column: 0,
                unlockRequirements: ["rabbitrider-glitch-strike"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['swap'];
                    if (skill && !unit.skills.find(s => s.id === 'swap')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Swap skill!`);
                    }
                }
            },
            {
                id: "rabbitrider-wishing-star",
                name: "Wishing Star",
                description: "Call upon a wishing star to restore energy and grant Speed buff to self and nearby allies. Costs 3 energy.",
                icon: "⭐",
                row: 1,
                column: 1,
                unlockRequirements: ["rabbitrider-bounce"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['wishing-star'];
                    if (skill && !unit.skills.find(s => s.id === 'wishing-star')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Wishing Star skill!`);
                    }
                }
            },
            {
                id: "rabbitrider-whirlwind",
                name: "Whirlwind",
                description: "Spin in a dazzling whirlwind that hits all surrounding enemies multiple times. Costs 4 energy.",
                icon: "🌪️",
                row: 1,
                column: 2,
                unlockRequirements: ["rabbitrider-gust-of-wind"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['whirlwind'];
                    if (skill && !unit.skills.find(s => s.id === 'whirlwind')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Whirlwind skill!`);
                    }
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "rabbitrider-knock-off",
                name: "Knock Off",
                description: "Swift strike that disarms enemies and knocks away their equipment. Costs 3 energy.",
                icon: "🥊",
                row: 2,
                column: 0,
                unlockRequirements: ["rabbitrider-swap"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['knock-off'];
                    if (skill && !unit.skills.find(s => s.id === 'knock-off')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Knock Off skill!`);
                    }
                }
            },
            {
                id: "rabbitrider-deployable-spring",
                name: "Deployable Spring",
                description: "Place a spring trap that launches enemies 2 squares away when stepped on. Costs 3 energy.",
                icon: "🌀",
                row: 2,
                column: 1,
                unlockRequirements: ["rabbitrider-wishing-star"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['deployable-spring'];
                    if (skill && !unit.skills.find(s => s.id === 'deployable-spring')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Deployable Spring skill!`);
                    }
                }
            },
            {
                id: "rabbitrider-air-cannon",
                name: "Air Cannon",
                description: "Fire a concentrated blast of air that pierces through enemies in a straight line. Costs 4 energy.",
                icon: "💨",
                row: 2,
                column: 2,
                unlockRequirements: ["rabbitrider-whirlwind"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['air-cannon'];
                    if (skill && !unit.skills.find(s => s.id === 'air-cannon')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Air Cannon skill!`);
                    }
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "rabbitrider-chaos",
                name: "Chaos",
                description: "Rapidly deploy 3 random objects and effects in nearby squares, creating battlefield chaos. Costs 5 energy.",
                icon: "🎲",
                row: 3,
                column: 0,
                unlockRequirements: ["rabbitrider-knock-off"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['chaos-creation'];
                    if (skill && !unit.skills.find(s => s.id === 'chaos-creation')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Chaos skill!`);
                    }
                }
            },
            {
                id: "rabbitrider-retreating-strike",
                name: "Retreating Strike",
                description: "Attack an enemy then immediately hop backward 2 squares. Great for hit-and-run tactics. Costs 3 energy.",
                icon: "🦘",
                row: 3,
                column: 1,
                unlockRequirements: ["rabbitrider-deployable-spring"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['retreating-strike'];
                    if (skill && !unit.skills.find(s => s.id === 'retreating-strike')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Retreating Strike skill!`);
                    }
                }
            },
            {
                id: "rabbitrider-tailwind",
                name: "Tailwind",
                description: "Create a favorable wind that increases movement by 2 and grants Evasion for 4 turns. Costs 3 energy.",
                icon: "🍃",
                row: 3,
                column: 2,
                unlockRequirements: ["rabbitrider-air-cannon"],
                effect: (unit: Unit) => {
                    const skill = SKILL_REGISTRY['tailwind'];
                    if (skill && !unit.skills.find(s => s.id === 'tailwind')) {
                        unit.skills.push(skill);
                        console.log(`${unit.name} learned Tailwind skill!`);
                    }
                }
            }
        ]
    }
};

// Helper functions
export function getSkillTreeForUnit(className: string): SkillTreeDefinition | null {
    return SKILL_TREE_DEX[className] || null;
}

export function getPerkById(className: string, perkId: string): PerkDefinition | null {
    const skillTree = getSkillTreeForUnit(className);
    if (!skillTree) return null;
    
    return skillTree.perks.find(perk => perk.id === perkId) || null;
}

export function getAvailablePerks(unit: Unit): PerkDefinition[] {
    const skillTree = getSkillTreeForUnit(unit.className);
    if (!skillTree) return [];
    
    return skillTree.perks.filter(perk => {
        // Check if perk is already purchased
        if (unit.purchasedPerks.includes(perk.id)) {
            return false;
        }
        
        // Check if all unlock requirements are met
        return perk.unlockRequirements.every(reqId => 
            unit.purchasedPerks.includes(reqId)
        );
    });
}

export function purchasePerk(unit: Unit, perkId: string): boolean {
    const perk = getPerkById(unit.className, perkId);
    if (!perk) return false;
    
    // Check if perk is available
    const availablePerks = getAvailablePerks(unit);
    if (!availablePerks.find(p => p.id === perkId)) {
        return false;
    }
    
    // Check if unit has perk points
    if (unit.perkPoints < 1) {
        return false;
    }
    
    // Purchase the perk
    unit.perkPoints -= 1;
    unit.purchasedPerks.push(perkId);
    
    // Apply the effect
    perk.effect(unit);
    
    return true;
} 