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
import missingno from '../assets/Images/missingno.png';
import boxImg from '../assets/Images/box.png';
import turretImg from '../assets/Images/turret.png';

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
    "testguy": {
        name: "Test Guy",
        energyType: "Potential",
        health: 17, // Same as swordsman
        maxEnergy: 10, // Same as swordsman
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
            'beam',                 // Hater
            'lights-on',            // Hater
            'bandage',              // Wizard
            'teleport',             // Wizard
            'prepare',              // Marksman
            'longshot',             // Marksman
            'toxic-cloud',          // Marksman
            'exhaust',              // Bannerman
            'jeer',                 // Bannerman
            'flare-shot',           // Bannerman
            'splash',               // Hypeman
            'spark-lance',          // Hypeman
            'lead-the-charge',      // Hypeman
            'rally',                // Shieldbearer
            'pierce',               // Shieldbearer
            'glass-floor',          // Shieldbearer
            'mist-spray',           // Sigilbearer
            'rescue',               // Various support skills
            'get-sturdy',
            'taunt',
            'glitch-strike',        // Rabbit Rider
            'bounce',               // Rabbit Rider
            'switcheroo',           // Salesman
            'bash',                 // Salesman
            'coin-toss'             // Salesman
            , 'box-drop'            // Builder
            , 'create-turret'       // Builder
            , 'deployable-spring'   // Builder
            , 'disarming-slash'     // Swordsman
            , 'inspiring-slash'     // Swordsman
            , 'spring-slash'        // Swordsman
            , 'revenge'             // Swordsman
            , 'forceful-strike'     // Swordsman
            , 'overpierce'          // Swordsman
            , 'smoke-grenade'       // Swordsman utility
            , 'lifeblade'           // Swordsman ultimate
            , 'teleport-slash'      // Swordsman ultimate
            , 'stars-blessing'      // Healer
            , 'purifying-hand'      // Healer
            , 'finger-of-god'       // Healer
            , 'star-song'           // Healer
            , 'flash-of-sun'        // Healer
            , 'aethers-grace'       // Healer
            , 'symphony'            // Healer
            , 'outburst'            // Healer
            , 'gust-of-wind'        // Add explicitly so it’s consistent
        ],
        passives: [], // No innate passives
        isTall: false,
    },
    // Future unit types will be added here
}; 