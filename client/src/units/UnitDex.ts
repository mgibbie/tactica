import { UnitStats } from './Unit';
import swordsman from '../assets/Images/swordsman.PNG';
import healer from '../assets/Images/healer.PNG';
import hater from '../assets/Images/hater.PNG';
import wizard from '../assets/Images/wizard.PNG';
import marksman from '../assets/Images/marksman.PNG';
import bannerman from '../assets/Images/bannerman.png';
import hypeman from '../assets/Images/hypeman.png';
import shieldbearer from '../assets/Images/shieldbearer.png';
import salesman from '../assets/Images/salesman.png';
import sigilbearer from '../assets/Images/sigilbearer.png';
import builder from '../assets/Images/builder.png';
import rabbitrider from '../assets/Images/rabbitrider.png';
import rabbit from '../assets/Images/rabbit.png';
import bodyguardImg from '../assets/Images/bodyguard.png';
import missingno from '../assets/Images/missingno.png';
import boxImg from '../assets/Images/box.png';
import turretImg from '../assets/Images/turret.png';
import flagImg from '../assets/Images/flag.png';
import barricadeImg from '../assets/Images/barricade.png';
import bombImg from '../assets/Images/bomb.png';
import droneImg from '../assets/Images/drone.png';

export const UNIT_DEX: Record<string, UnitStats> = {
    "box": {
        name: "Box",
        energyType: "Kinetic",
        health: 4,
        maxEnergy: 1,
        basicDamage: 1,
        skillDamage: 1,
        range: 1,
        move: 1,
        cost: 0,
        imageUrl: boxImg,
        skills: [],
        passives: [],
        isTall: false,
    },
    "turret": {
        name: "Turret",
        energyType: "Kinetic",
        health: 5,
        maxEnergy: 1,
        basicDamage: 1,
        skillDamage: 1,
        range: 2,
        move: 0,
        cost: 0,
        imageUrl: turretImg,
        skills: [],
        passives: ['sentry'],
        isTall: false,
    },
    "flag": {
        name: "Flag",
        energyType: "Kinetic",
        health: 3,
        maxEnergy: 1,
        basicDamage: 0,
        skillDamage: 0,
        range: 0,
        move: 0,
        cost: 0,
        imageUrl: flagImg,
        skills: [],
        passives: ['flag-fervor'],
        isTall: false,
    },
    "barricade": {
        name: "Barricade",
        energyType: "Kinetic",
        health: 5,
        maxEnergy: 1,
        basicDamage: 0,
        skillDamage: 0,
        range: 0,
        move: 0,
        cost: 0,
        imageUrl: barricadeImg,
        skills: [],
        passives: ['tall'],
        isTall: true,
    },
    "bomb": {
        name: "Bomb",
        energyType: "Kinetic",
        health: 3,
        maxEnergy: 1,
        basicDamage: 0,
        skillDamage: 0,
        range: 0,
        move: 0,
        cost: 0,
        imageUrl: bombImg,
        skills: [],
        passives: ['ready-to-blow'],
        isTall: false,
    },
    "drone": {
        name: "Drone",
        energyType: "Kinetic",
        health: 5,
        maxEnergy: 1,
        basicDamage: 4,
        skillDamage: 1,
        range: 3,
        move: 4,
        cost: 0,
        imageUrl: droneImg,
        skills: [],
        passives: ['sentry'],
        isTall: false,
    },
    "swordsman": {
        name: "Swordsman",
        energyType: "Kinetic",
        health: 17,
        maxEnergy: 10,
        basicDamage: 8,
        skillDamage: 3,
        range: 1,
        move: 3,
        cost: 3,
        imageUrl: swordsman,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['stoic'], // Stoic passive is innate to all Swordsmen
        isTall: false,
    },
    "healer": {
        name: "Healer",
        energyType: "Potential",
        health: 18,
        maxEnergy: 20,
        basicDamage: 3,
        skillDamage: 4, // Assuming "Skill Damage" refers to healing amount or a utility skill
        range: 2,
        move: 3,
        cost: 3,
        imageUrl: healer,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['blessing-box'], // Blessing Box passive is innate to all Healers
        isTall: false,
    },
    "hater": {
        name: "Hater",
        energyType: "Potential",
        health: 16,
        maxEnergy: 22,
        basicDamage: 5,
        skillDamage: 4,
        range: 3,
        move: 3,
        cost: 3,
        imageUrl: hater,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['toxic-presence'], // Toxic Presence passive is innate to all Haters
        isTall: false,
    },
    "wizard": {
        name: "Wizard",
        energyType: "Potential",
        health: 10,
        maxEnergy: 15,
        basicDamage: 3,
        skillDamage: 7,
        range: 3,
        move: 3,
        cost: 3,
        imageUrl: wizard,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['mastery'], // Mastery passive is innate to all Wizards
        isTall: false,
        // Note: "Master's Patience" could be a special trait/ability to be implemented.
    },
    "marksman": {
        name: "Marksman",
        energyType: "Kinetic",
        health: 12,
        maxEnergy: 10,
        basicDamage: 7,
        skillDamage: 3,
        range: 4,
        move: 3,
        cost: 3,
        imageUrl: marksman,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['overwatch'], // Overwatch passive is innate to all Marksmen
        isTall: false,
    },
    "bannerman": {
        name: "Bannerman",
        energyType: "Potential",
        health: 20,
        maxEnergy: 25,
        basicDamage: 3,
        skillDamage: 3,
        range: 2,
        move: 4,
        cost: 3,
        imageUrl: bannerman,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['rally-cry'], // Rally Cry passive is innate to all Bannermen
        isTall: false,
    },
    "hypeman": {
        name: "Hype Man",
        energyType: "Potential",
        health: 16,
        maxEnergy: 22,
        basicDamage: 4,
        skillDamage: 5,
        range: 3,
        move: 3,
        cost: 3,
        imageUrl: hypeman,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['beatbox'], // Beatbox passive is innate to all Hype Men
        isTall: false,
    },
    "shieldbearer": {
        name: "Shieldbearer",
        energyType: "Kinetic",
        health: 23,
        maxEnergy: 18,
        basicDamage: 5,
        skillDamage: 5,
        range: 1,
        move: 3,
        cost: 3,
        imageUrl: shieldbearer,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['resolute'], // Resolute passive is innate to all Shieldbearers
        isTall: false,
    },
    "salesman": {
        name: "Salesman",
        energyType: "Potential",
        health: 15,
        maxEnergy: 15,
        basicDamage: 4,
        skillDamage: 5,
        range: 2,
        move: 4,
        cost: 3,
        imageUrl: salesman,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['death-of-a-salesman'], // Death of a Salesman passive is innate to all Salesmen
        isTall: false,
    },
    "sigilbearer": {
        name: "Sigilbearer",
        energyType: "Potential",
        health: 20,
        maxEnergy: 20,
        basicDamage: 4,
        skillDamage: 6,
        range: 3,
        move: 3,
        cost: 3,
        imageUrl: sigilbearer,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['walking-ward'], // Walking Ward passive is innate to all Sigilbearers
        isTall: false,
    },
    "builder": {
        name: "Builder",
        energyType: "Kinetic",
        health: 20,
        maxEnergy: 15,
        basicDamage: 5,
        skillDamage: 5,
        range: 1,
        move: 3,
        cost: 3,
        imageUrl: builder,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['my-baby'], // Gains buffs when creations die
        isTall: false,
    },
    "rabbitrider": {
        name: "Rabbit Rider",
        energyType: "Kinetic",
        health: 9,
        maxEnergy: 13,
        basicDamage: 2,
        skillDamage: 2,
        range: 1,
        move: 6,
        cost: 3,
        imageUrl: rabbitrider,
        skills: [], // No starting skills - must unlock through skill tree
        passives: ['rabbit-riding', 'lucky-rabbit-foot'], // Rabbit Riding + Lucky Rabbit Foot
        isTall: false,
    },
    "rabbit": {
        name: "Rabbit",
        energyType: "Kinetic",
        health: 9,
        maxEnergy: 13,
        basicDamage: 2,
        skillDamage: 2,
        range: 1,
        move: 6,
        cost: 0,
        imageUrl: rabbit,
        skills: [],
        passives: [],
        isTall: false,
    },
    "bodyguard": {
        name: "Bodyguard",
        energyType: "Kinetic",
        health: 13,
        maxEnergy: 10,
        basicDamage: 5,
        skillDamage: 5,
        range: 1,
        move: 3,
        cost: 0,
        imageUrl: bodyguardImg,
        skills: ['bash'],
        passives: ['soulbound'],
        isTall: false,
    },
    "testguy": {
        name: "Test Guy",
        energyType: "Potential",
        health: 100,
        maxEnergy: 100, // Reset to 100 for testing
        basicDamage: 8, // Same as swordsman
        skillDamage: 3, // Same as swordsman
        range: 1, // Same as swordsman
        move: 3, // Same as swordsman
        cost: 0, // Never sold in shop
        imageUrl: missingno,
        skills: [
            // Tier 1 skills from various unit types (excluding salesman, rabbit rider, builder)
            'universal-whisper',    // Healer
            'healing-circle',       // Healer
            // 'beam',                 // removed from testguy
            'lights-on',            // Hater
            'longshot',             // Marksman
            'toxic-cloud',          // Marksman
            'exhaust',              // Bannerman
            'jeer',                 // Bannerman
            'flare-shot',           // Bannerman
            'flare-up',             // Wizard - new Burn debuff
            'splash',               // Hypeman
            'spark-lance',          // Hypeman
            'lead-the-charge',      // Hypeman
            'rally',                // Shieldbearer
            'pierce',               // Shieldbearer
            'glass-floor',          // Shieldbearer
            'mist-spray',           // Sigilbearer
            'mistwalk',             // Sigilbearer Mistwalk for testing
            'rescue',               // Various support skills
            'get-sturdy',
            'taunt',
            'glitch-strike',        // Rabbit Rider
            'bounce',               // Rabbit Rider
            'switcheroo',           // Salesman
            'bash',                 // Salesman
            'coin-toss',            // Salesman
            'deal-breaker'          // Salesman Deal Breaker for testing
            , 'knock-off'           // Salesman Knock Off for testing
            , 'transcendence'       // Salesman Transcendence for testing
            , 'wishing-star'        // Rabbit Rider Wishing Star for testing
            , 'air-cannon'          // Rabbit Rider Air Cannon for testing
            , 'chaos'               // Rabbit Rider Chaos for testing
            , 'retreating-strike'   // Rabbit Rider Retreating Strike for testing
            , 'tailwind'            // Rabbit Rider Tailwind for testing
            , 'box-drop'            // Builder
            , 'breaker'             // Builder Breaker for testing
            , 'substitution'        // Builder Substitution for testing
            , 'forceful-strike'     // Builder Forceful Strike for testing
            , 'bomb-drop'           // Builder Bomb Drop for testing
            , 'chaos-creation'      // Builder Chaos Creation for testing
        , 'boxed-in'            // Builder Boxed In for testing
            , 'create-turret'       // Builder
            , 'drone-clone'         // Builder Drone Clone for testing
            , 'deployable-spring'   // Builder
            , 'plant-the-flag'      // Bannerman new skill for testing
            , 'barricade'           // Shieldbearer Barricade for testing
            , 'the-wall'            // Shieldbearer The Wall for testing
            , 'spring-slash'        // Swordsman
            , 'overpierce'          // Swordsman
            , 'purifying-hand'      // Healer
            , 'finger-of-god'       // Healer
            , 'star-song'           // Healer
            , 'flash-of-sun'        // Healer
            , 'aethers-grace'       // Healer
            , 'symphony'            // Healer
            , 'outburst'            // Healer
            , 'gust-of-wind'        // Add explicitly so it’s consistent
            , 'distraction'         // Hater Distraction for testing
            , 'back-off'            // Hater Back Off for testing
            , 'drain-punch'         // Hater Drain Punch for testing
            , 'toxic-king'          // Hater Toxic King for testing
            , 'psyche-break'        // Hater Psyche Break for testing
            , 'dizzy-slam'          // Hater Dizzy Slam for testing
            , 'aim-high'            // Marksman Aim High for testing
            , 'backflip'            // Marksman Backflip for testing
            , 'zero-in'             // Marksman Zero In for testing
            , 'tracking-dart'       // Marksman Tracking Dart for testing
            , 'flashbang'           // Marksman Flashbang for testing
            , 'aim-low'             // Marksman Aim Low for testing
            , 'perimeter'           // Marksman Perimeter for testing
            , 'hunker-down'         // Marksman Hunker Down for testing
            , 'last-breath'         // Sigilbearer Last Breath for testing
            , 'solar-ray'           // Wizard Solar Ray for testing
            , 'comet-tail'          // Wizard Comet Tail for testing
            , 'cosmic-impact'       // Wizard Cosmic Impact for testing
            , 'divination'          // Wizard Divination for testing
            , 'tidal-lock'          // Wizard Tidal Lock for testing
            , 'cauterize'           // Wizard Cauterize for testing
            , 'gaias-rage'          // Wizard Gaia's Rage for testing
            , 'plasma-tempest'      // Wizard Plasma Tempest for testing
            , 'inspire-violence'    // Hypeman Inspire Violence for testing
            , 'mirror-aegis'        // Hypeman Mirror Aegis for testing
            , 'peace-sign'          // Hypeman Peace Sign for testing
            , 'idolize'             // Hypeman Idolize for testing
            , 'slip-counter'        // Hypeman Slip Counter for testing
            , 'whirlwind'           // Hypeman Whirlwind for testing
            , 'sound-barrier'       // Hypeman Sound Barrier for testing
            , 'symphony'            // Ensure Symphony available for testing
            , 'call-to-action'      // Hypeman Call to Action for testing
            , 'staccato'            // Bannerman Staccato for testing
            , 'anthem'              // Bannerman Anthem for testing
            , 'redistribute'        // Bannerman Redistribute for testing
            , 'shield-bash'         // Shieldbearer Shield Bash for testing
            , 'bouncer'             // Shieldbearer Bouncer for testing
            , 'swap'                // Shieldbearer Swap for testing
            , 'entrench'            // Shieldbearer Entrench for testing
            , 'phalanx'             // Shieldbearer Phalanx for testing
            , 'rock-solid'          // Shieldbearer Rock Solid for testing
            , 'reflect'             // Sigilbearer Reflect for testing
            , 'primal-mark'         // Sigilbearer Primal Mark for testing
            , 'flatten'             // Sigilbearer Flatten for testing
            , 'misticism'           // Sigilbearer Misticism for testing
            , 'terraform'           // Sigilbearer Terraform for testing
            , 'void-ray'            // Sigilbearer Void Ray for testing
            , 'mirrormancy'         // Sigilbearer Mirrormancy for testing
            , 'gift-of-the-void'    // Salesman Gift of the Void for testing
            , 'reinvigorate'        // Salesman Reinvigorate for testing
            , 'private-practice'    // Salesman Private Practice for testing
            , 'airstrike'           // Salesman Airstrike for testing
            , 'hired-help'          // Salesman Hired Help for testing
        ],
        passives: [], // No innate passives
        isTall: false,
    },
    // Future unit types will be added here
}; 