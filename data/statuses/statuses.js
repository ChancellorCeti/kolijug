export const STATUSES = {
    stunned: {
        id: "stunned",
        name: "Stunned",
        type: "control",
        duration: [2, 4],
        stackable: false,

        effects: {
            skipTurn: true
        }
    },

    burning: {
        id: "burning",
        name: "Burning",
        type: "damage",
        stackable: true,
        duration: [2, 4],
        effects: {
            damagePerTurn: [3, 6]
        }
    },

    shielded: {
        id: "basic_shielded",
        name: "Shielded",
        type: "defensive",
        duration: 2,
        stackable:false,

        effects: {
            damageReduction: 0.5
        }
    }
};
