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
                description: "Strike that disarms enemies, reducing their attack power.",
                icon: "🗡️",
                row: 1,
                column: 0,
                unlockRequirements: ["swordsman-bandage"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Disarming Slash!`);
                }
            },
            {
                id: "swordsman-inspiring-slash",
                name: "Inspiring Slash",
                description: "Strike that boosts nearby allies' morale and energy.",
                icon: "⚔️",
                row: 1,
                column: 1,
                unlockRequirements: ["swordsman-prepare"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Inspiring Slash!`);
                }
            },
            {
                id: "swordsman-spring-slash",
                name: "Spring Slash",
                description: "Swift leaping attack that covers great distance.",
                icon: "🌸",
                row: 1,
                column: 2,
                unlockRequirements: ["swordsman-teleport"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Spring Slash!`);
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "swordsman-revenge",
                name: "Revenge",
                description: "Deal massive damage when health is low.",
                icon: "💀",
                row: 2,
                column: 0,
                unlockRequirements: ["swordsman-disarming-slash"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Revenge!`);
                }
            },
            {
                id: "swordsman-forceful-strike",
                name: "Forceful Strike",
                description: "Powerful attack that can push enemies back.",
                icon: "💥",
                row: 2,
                column: 1,
                unlockRequirements: ["swordsman-inspiring-slash"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Forceful Strike!`);
                }
            },
            {
                id: "swordsman-smoke-grenade",
                name: "Smoke Grenade",
                description: "Create a smoke screen to obscure vision and escape.",
                icon: "💨",
                row: 2,
                column: 2,
                unlockRequirements: ["swordsman-spring-slash"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Smoke Grenade!`);
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "swordsman-lifeblade",
                name: "Lifeblade",
                description: "Attacks heal the wielder based on damage dealt.",
                icon: "❤️",
                row: 3,
                column: 0,
                unlockRequirements: ["swordsman-revenge"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Lifeblade!`);
                }
            },
            {
                id: "swordsman-overpierce",
                name: "Overpierce",
                description: "Attacks pierce through enemies to hit multiple targets.",
                icon: "🔥",
                row: 3,
                column: 1,
                unlockRequirements: ["swordsman-forceful-strike"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Overpierce!`);
                }
            },
            {
                id: "swordsman-teleport-slash",
                name: "Teleport Slash",
                description: "Instantly teleport to any enemy and strike with devastating force.",
                icon: "🌟",
                row: 3,
                column: 2,
                unlockRequirements: ["swordsman-smoke-grenade"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Teleport Slash!`);
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
                description: "Call upon celestial power to grant divine protection.",
                icon: "⭐",
                row: 1,
                column: 0,
                unlockRequirements: ["healer-universal-whisper"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Star's Blessing!`);
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
                    console.log(`${unit.name} learned Outburst!`);
                }
            },
            {
                id: "healer-purifying-hand",
                name: "Purifying Hand",
                description: "Cleanse corruption and purify the battlefield with divine touch.",
                icon: "🤲",
                row: 1,
                column: 2,
                unlockRequirements: ["healer-beam"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Purifying Hand!`);
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "healer-finger-of-god",
                name: "Finger of God",
                description: "Channel divine wrath to smite enemies with holy power.",
                icon: "👆",
                row: 2,
                column: 0,
                unlockRequirements: ["healer-stars-blessing"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Finger of God!`);
                }
            },
            {
                id: "healer-star-song",
                name: "Star Song",
                description: "Sing a celestial melody that inspires and empowers allies.",
                icon: "🎵",
                row: 2,
                column: 1,
                unlockRequirements: ["healer-outburst"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Star Song!`);
                }
            },
            {
                id: "healer-flash-of-sun",
                name: "Flash of Sun",
                description: "Blind enemies with brilliant solar radiance while healing allies.",
                icon: "☀️",
                row: 2,
                column: 2,
                unlockRequirements: ["healer-purifying-hand"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Flash of Sun!`);
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "healer-aethers-grace",
                name: "Aether's Grace",
                description: "Invoke the highest divine blessing for ultimate healing power.",
                icon: "🕊️",
                row: 3,
                column: 0,
                unlockRequirements: ["healer-finger-of-god"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Aether's Grace!`);
                }
            },
            {
                id: "healer-symphony",
                name: "Symphony",
                description: "Conduct a divine symphony that harmonizes all magical energies.",
                icon: "🎼",
                row: 3,
                column: 1,
                unlockRequirements: ["healer-star-song"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Symphony!`);
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
                    console.log(`${unit.name} learned Rescue!`);
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
                description: "Launch a toxic projectile that deals damage over time.",
                icon: "🎯",
                row: 1,
                column: 0,
                unlockRequirements: ["hater-toxic-cloud"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Poison Dart!`);
                }
            },
            {
                id: "hater-outburst",
                name: "Outburst",
                description: "Explosive tantrum that damages and stuns nearby enemies.",
                icon: "🤬",
                row: 1,
                column: 1,
                unlockRequirements: ["hater-jeer"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Outburst!`);
                }
            },
            {
                id: "hater-distraction",
                name: "Distraction",
                description: "Confuse enemies, making them attack each other instead.",
                icon: "🌀",
                row: 1,
                column: 2,
                unlockRequirements: ["hater-exhaust"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Distraction!`);
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
                    console.log(`${unit.name} learned Taunt!`);
                }
            },
            {
                id: "hater-back-off",
                name: "Back Off",
                description: "Aggressive shout that pushes enemies away and intimidates them.",
                icon: "🚫",
                row: 2,
                column: 1,
                unlockRequirements: ["hater-outburst"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Back Off!`);
                }
            },
            {
                id: "hater-drain-punch",
                name: "Drain Punch",
                description: "Steal energy from enemies on hit to fuel your own abilities.",
                icon: "🥊",
                row: 2,
                column: 2,
                unlockRequirements: ["hater-distraction"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Drain Punch!`);
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "hater-toxic-king",
                name: "Toxic King",
                description: "Become immune to poison and spread toxicity with every attack.",
                icon: "👑",
                row: 3,
                column: 0,
                unlockRequirements: ["hater-taunt"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Toxic King!`);
                }
            },
            {
                id: "hater-psyche-break",
                name: "Psyche Break",
                description: "Shatter enemy morale, causing them to flee or surrender.",
                icon: "💔",
                row: 3,
                column: 1,
                unlockRequirements: ["hater-back-off"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Psyche Break!`);
                }
            },
            {
                id: "hater-dizzy-slam",
                name: "Dizzy Slam",
                description: "Devastating attack that leaves enemies disoriented and vulnerable.",
                icon: "🌪️",
                row: 3,
                column: 2,
                unlockRequirements: ["hater-drain-punch"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Dizzy Slam!`);
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
                description: "Channel the power of the sun into a concentrated beam of light.",
                icon: "☀️",
                row: 1,
                column: 0,
                unlockRequirements: ["wizard-flare-shot"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Solar Ray!`);
                }
            },
            {
                id: "wizard-comet-tail",
                name: "Comet Tail",
                description: "Summon a trailing comet that burns enemies in its path.",
                icon: "☄️",
                row: 1,
                column: 1,
                unlockRequirements: ["wizard-splash"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Comet Tail!`);
                }
            },
            {
                id: "wizard-cosmic-impact",
                name: "Cosmic Impact",
                description: "Call down cosmic forces to strike with devastating power.",
                icon: "🌌",
                row: 1,
                column: 2,
                unlockRequirements: ["wizard-spark-lance"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Cosmic Impact!`);
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
                description: "Peer into the future to predict and counter enemy actions.",
                icon: "🔮",
                row: 2,
                column: 1,
                unlockRequirements: ["wizard-comet-tail"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Divination!`);
                }
            },
            {
                id: "wizard-cauterize",
                name: "Cauterize",
                description: "Use magical fire to seal wounds and purify corruption.",
                icon: "🩸",
                row: 2,
                column: 2,
                unlockRequirements: ["wizard-cosmic-impact"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Cauterize!`);
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "wizard-gaias-rage",
                name: "Gaia's Rage",
                description: "Channel the earth's fury to cause devastating earthquakes and eruptions.",
                icon: "🌍",
                row: 3,
                column: 0,
                unlockRequirements: ["wizard-flare-up"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Gaia's Rage!`);
                }
            },
            {
                id: "wizard-tidal-lock",
                name: "Tidal Lock",
                description: "Bind enemies in place with gravitational forces and crushing water pressure.",
                icon: "🌊",
                row: 3,
                column: 1,
                unlockRequirements: ["wizard-divination"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Tidal Lock!`);
                }
            },
            {
                id: "wizard-plasma-tempest",
                name: "Plasma Tempest",
                description: "Unleash a storm of superheated plasma that devastates the battlefield.",
                icon: "🌪️",
                row: 3,
                column: 2,
                unlockRequirements: ["wizard-cauterize"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Plasma Tempest!`);
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
                description: "Target enemy weak points for increased critical hit chance.",
                icon: "🎪",
                row: 1,
                column: 0,
                unlockRequirements: ["marksman-lights-on"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Aim High!`);
                }
            },
            {
                id: "marksman-backflip",
                name: "Backflip",
                description: "Agile maneuver that repositions and evades enemy attacks.",
                icon: "🤸",
                row: 1,
                column: 1,
                unlockRequirements: ["marksman-bandage"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Backflip!`);
                }
            },
            {
                id: "marksman-zero-in",
                name: "Zero-In",
                description: "Focus intensely on a target to guarantee the next shot hits.",
                icon: "🔍",
                row: 1,
                column: 2,
                unlockRequirements: ["marksman-longshot"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Zero-In!`);
                }
            },
            // Third row (Row 2) - Requires second row perks
            {
                id: "marksman-tracking-dart",
                name: "Tracking Dart",
                description: "Fire a dart that marks enemies, revealing their position and weaknesses.",
                icon: "🏹",
                row: 2,
                column: 0,
                unlockRequirements: ["marksman-aim-high"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Tracking Dart!`);
                }
            },
            {
                id: "marksman-flashbang",
                name: "Flashbang",
                description: "Throw a blinding grenade that stuns and disorients enemies.",
                icon: "⚡",
                row: 2,
                column: 1,
                unlockRequirements: ["marksman-backflip"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Flashbang!`);
                }
            },
            {
                id: "marksman-aim-low",
                name: "Aim Low",
                description: "Target enemy legs to slow their movement and reduce mobility.",
                icon: "🦵",
                row: 2,
                column: 2,
                unlockRequirements: ["marksman-zero-in"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Aim Low!`);
                }
            },
            // Fourth row (Row 3) - Ultimate perks
            {
                id: "marksman-perimeter",
                name: "Perimeter",
                description: "Establish a defensive perimeter that detects and slows approaching enemies.",
                icon: "🛡️",
                row: 3,
                column: 0,
                unlockRequirements: ["marksman-tracking-dart"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Perimeter!`);
                }
            },
            {
                id: "marksman-hunker-down",
                name: "Hunker Down",
                description: "Take a defensive stance that increases defense but reduces movement.",
                icon: "🏠",
                row: 3,
                column: 1,
                unlockRequirements: ["marksman-flashbang"],
                effect: (unit: Unit) => {
                    console.log(`${unit.name} learned Hunker Down!`);
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
                    console.log(`${unit.name} learned Overpierce!`);
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
                    console.log(`${unit.name} learned Bash!`);
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
                    console.log(`${unit.name} learned Outburst!`);
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
                    console.log(`${unit.name} learned Rescue!`);
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
                description: "Energize yourself and nearby allies, boosting their energy and morale for the next turn.",
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
                description: "Maintain a rhythmic pulse that grants consistent energy regeneration to all allies.",
                icon: "🎵",
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
                description: "Release an explosive burst of hype energy that damages enemies and energizes allies.",
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
                description: "Channel aggressive energy to boost allies' attack damage and critical hit chance.",
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
                description: "Create a reflective shield that redirects enemy attacks back at them.",
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
                description: "Flash a calming peace sign that pacifies enemies and heals nearby allies.",
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
                description: "Become the center of attention, drawing all enemy attacks while boosting ally performance.",
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