import { UnitStats } from './Unit';
import swordsman from '../assets/Images/swordsman.PNG';
import healer from '../assets/Images/healer.PNG';
import hater from '../assets/Images/hater.PNG';
import wizard from '../assets/Images/wizard.PNG';
import marksman from '../assets/Images/marksman.PNG';
import bannerman from '../assets/Images/bannerman.png';

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
        skills: ["blazing-knuckle"],
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
        skills: ["hurricane-slash"],
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
        skills: ["tera-fire"],
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
        skills: ["blazing-knuckle"], // Using placeholder skill for now
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
        skills: ["blazing-knuckle"], // Using placeholder skill for now
    },
    // Future unit types will be added here
}; 