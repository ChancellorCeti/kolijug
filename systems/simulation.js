import * as economy from "./economy.js";
import * as politics from "./politics.js";

export function getDistrictView(state, districtId) {
    const district = state.world.districts[districtId];

    return {
        stability: politics.getStability(district),
        coupRisk: politics.getCoupRisk(district),
        rulingParty: district.rulingParty
    };
}

export function getNpcPrice(state, districtId, npc) {
    const district = state.world.districts[districtId];
    return economy.getPrice(npc, district);
}
