import { getStability } from "./politics.js";

export function getPrice(npc, district) {
    let price = npc.basePrice;
    const stability = getStability(district);

    price *= (1 + (1 - stability));
    price += district.coupCount * 5;

    if (district.rulingParty === "randians") {
        price *= 0.9;
    }

    if (district.rulingParty === "bhakts") {
        price *= 1.1;
    }

    return Math.floor(price);
}
