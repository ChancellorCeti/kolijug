import { processStatusesAtTurnEnd, canAct } from "./combat/statusEngine.js"
import { attack } from "./combat/coreCombatLogic.js"


function takeTurn(attacker, defender) {
    console.log(`\n${attacker.name}'s turn`);

    processStatusesAtTurnEnd(attacker);

    if (attacker.hp <= 0) return;

    if (!canAct(attacker)) {
        console.log(`${attacker.name} is stunned`);
        return;
    }
    const result = attack(attacker, defender);

    if (!result.hit) {
        console.log(`${attacker.name} missed`);
    } else {
        console.log(
            `${attacker.name} hits for ${result.damage} HP`
        );
    }

    console.log(`${defender.name} HP: ${defender.hp}`);
}

export function runBattle(player, enemy) {
    let turn = 1;

    while (player.hp > 0 && enemy.hp > 0) {
        console.log(`\nTurn ${turn}`);

        // player turn
        takeTurn(player, enemy);
        if (enemy.hp <= 0 || enemy.hp<=0) break;

        // enemy turn
        takeTurn(enemy, player);
        if (player.hp <= 0 || enemy.hp<=0) break;

        turn++;
    }

    console.log("\n battle over");

    if (player.hp > 0) {
        console.log("player won");
        console.log(enemy);
        console.log(player);
    } else {
        console.log("enemy won");
        console.log(player);
        console.log(enemy);
    }
}
