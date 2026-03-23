import {applyStatus} from "../../combat/statusEngine.js"
export const WEAPONS = {
    basic_alien_flamethrower: {
        id: "basic_alien_flamethrower",
        name: "Ognidhrishthi",

        damage: [8, 14],
        accuracy: 0.9,
        critChance: 0.1,
        critMultiplier: 1.5,
        shots: [2, 4],
        rarity: "common",
        species: "alien",

        attackType: "fire",

        traits: ["precise", "low_noise"],

        onHit: (attacker, defender) => {
            if (Math.random() < 1.1) {
                applyStatus(attacker, defender, "burning");
            }
        }
    }
};
