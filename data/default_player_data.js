export const defaultState = {
    version: 1,
    name: "",
    hp: 100,
    maxHp: 100,
    district: "sanjaystan",
    districtLocation: 0,
    inventory: [
    ],
    equippedItems: [
        {
            type: "weapon",
            id: "basic_alien_flamethrower",
            modifiers: []
        }
    ],
    money: 0,
    bagSize: 10,
    statuses:[],
    quests_progress: {
        sanjaystan: [
            {
                id: 0, // defend state assembly
                progress: 0
            },
            {
                id: 1, // free forced laborers
                progress: 0
            }
        ]
    },
    npc_rapport: [
        {
            npc_id: 0,
            rapport: 0
        },
        {
            npc_id: 1,
            rapport: 0
        }
    ],
    species_rapport: [
        {
            species_id: 0,
            rapport: 0
        },
        {
            species_id: 1,
            rapport: 0
        }

    ],
    parties_rapport: [
        {
            party_id: 0,
            rapport: 0
        },
        {
            party_id: 1,
            rapport: 0
        }

    ],
    skills_progress: [
        {
            skill_id: 0,
            progress: 0
        },
        {
            skill_id: 1,
            progress: 0
        }
    ],

    world: {
        districts: {
            sanjaystan: {
                coupCount: 0,
                rulingParty: "randians",
                stability: 1.0,
                unlocked: {
                    railway: false
                },
                sentiment: {
                    species: {
                        human: 0.2,
                        alien: 0.6
                    },
                    classes: {
                        poor: 0.7,
                        middle: 0.3,
                        rich: 0.1
                    }
                }
            }
        }
    }
};
