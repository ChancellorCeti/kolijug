import {getDistrictData} from '../utils/district_utils.js'

export function getStability(district) {
    let stability = 1.0;

    stability -= district.coupCount * 0.2;

    if (district.rulingParty === "bhakts") {
        stability -= 0.3;
    }

    return Math.max(0, stability);
}

export function getCoupRisk(district) {
    const stability = getStability(district);

    return 1 - stability;
}

export function getPartySupport(staticData, state, partyId) {
    const party = staticData.parties.find(p => p.id === partyId);

    let total = 0;

    for (const species in staticData.species) {
        const pop = staticData.species[species];
        const anger = state.sentiment.species[species] || 0;

        let modifier = 0;

        if (party.supports.species.includes(species)) {
            modifier = +1;
        } else if (party.hates.species.includes(species)) {
            modifier = -1;
        }

        total += pop * (anger * modifier);
    }

    for (const cls in staticData.classes) {
        const pop = staticData.classes[cls];
        const anger = state.sentiment.classes[cls] || 0;

        let modifier = 0;

        if (party.supports.classes.includes(cls)) {
            modifier = +1;
        } else if (party.hates.classes.includes(cls)) {
            modifier = -1;
        }

        total += pop * (anger * modifier);
    }

    return Math.max(0, total);
}

export async function resolveCoup(state, districtId, favoredParty) {
    const districtState = state.world.districts[districtId];
    const districtStatic = await getDistrictData(districtId); // JSON

    const stability = getStability(districtState);
    const support = getPartySupport(
        districtStatic,
        districtState,
        favoredParty
    );

    const normalizedSupport = Math.min(1, support);

    const successChance =
        normalizedSupport * 0.7 + (1 - stability) * 0.3;

    const roll = Math.random();

    if (roll < successChance) {
        districtState.rulingParty = favoredParty;
    } else {
        const chaosParty = pickChaosParty(
            districtStatic,
            districtState,
            favoredParty
        );

        districtState.rulingParty = chaosParty;
    }

    applyRulingEffects(districtState, districtStatic);
    districtState.coupCount += 1;
}

function pickChaosParty(staticData, state, excludedParty) {
    const weights = [];

    for (const party of staticData.parties) {
        if (party.id === excludedParty) continue;

        const support = getPartySupport(staticData, state, party.id);

        weights.push({ party: party.id, weight: support });
    }

    return weightedRandom(weights);
}


export function applyRulingEffects(districtState, districtStatic) {
    const party = districtStatic.parties.find(
        p => p.id === districtState.rulingParty
    );

    const SUPPORT_REDUCTION = 0.1;
    const NEUTRAL_DRIFT = 0.02;
    const HATE_INCREASE = 0.15;

    for (const species in districtState.sentiment.species) {
        if (party.supports.species.includes(species)) {
            districtState.sentiment.species[species] -= SUPPORT_REDUCTION;

        } else if (party.hates.species.includes(species)) {
            districtState.sentiment.species[species] += HATE_INCREASE;

        } else {
            districtState.sentiment.species[species] += NEUTRAL_DRIFT;
        }
    }

    for (const cls in districtState.sentiment.classes) {
        if (party.supports.classes.includes(cls)) {
            districtState.sentiment.classes[cls] -= SUPPORT_REDUCTION;

        } else if (party.hates.classes.includes(cls)) {
            districtState.sentiment.classes[cls] += HATE_INCREASE;

        } else {
            districtState.sentiment.classes[cls] += NEUTRAL_DRIFT;
        }
    }

    clampSentiment(districtState);
}

function clampSentiment(districtState) {
    const clamp = (x) => Math.max(0, Math.min(1, x));

    for (const s in districtState.sentiment.species) {
        districtState.sentiment.species[s] =
            clamp(districtState.sentiment.species[s]);
    }

    for (const c in districtState.sentiment.classes) {
        districtState.sentiment.classes[c] =
            clamp(districtState.sentiment.classes[c]);
    }
}

function weightedRandom(items) {
    let totalWeight = 0;

    for (const item of items) {
        totalWeight += item.weight;
    }

    if (totalWeight <= 0) {
        return items[Math.floor(Math.random() * items.length)].party;
    }

    let roll = Math.random() * totalWeight;

    for (const item of items) {
        roll -= item.weight;

        if (roll <= 0) {
            return item.party;
        }
    }

    return items[items.length - 1].party; // i hate floating points
}
