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
import missingno from '../assets/Images/missingno.png';

export const UNIT_DEX: Record<string, UnitStats> = {
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
            'blazing-knuckle',      // Swordsman
            'tera-fire',            // Swordsman
            'universal-whisper',    // Healer
            'healing-circle',       // Healer
            'beam',                 // Hater
            'lights-on',            // Hater
            'hurricane-slash',      // Wizard
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
            'last-breath'
        ],
        isTall: false,
    },
    // Future unit types will be added here
}; 