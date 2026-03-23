import { getDistrictView } from './systems/simulation.js'
import { saveGame, loadGame, exportSave } from './utils/state.js'
import { resolveCoup } from './systems/politics.js';
import {runBattle} from "./combat_test.js"

export async function core_cycle() {
    let state = loadGame();

    let coreDiv = document.createElement("div");
    coreDiv.id = "coreDiv";
    document.body.append(coreDiv);

    let exportBtn = document.createElement("button");
    exportBtn.innerHTML = "eport game";
    exportBtn.onclick = () => exportSave(loadGame());
    coreDiv.append(exportBtn);

    await test_coups(state);

    let enemy = {
        name: "Alien Raider",
        hp: 85,
        maxHp: 85,
        statuses: [],
        equippedItems: [
            { type: "weapon", id: "basic_alien_flamethrower" }
        ]
    };
    runBattle(state, enemy);

}

async function test_coups(state) {
    let sanjay_view = getDistrictView(state, "sanjaystan");
    console.log(sanjay_view);
    await resolveCoup(state, "sanjaystan", "bhakts");
    saveGame(state);
    console.log(state);
}
