import { STATUSES } from "../data/statuses/statuses.js";
import { rollRange, rollRangeOrPreset } from "../utils/general_utils.js";

export function applyStatus(playerState, target, statusId) {
    const statusDef = STATUSES[statusId];

    const statusInstance = {
        id: statusId,
        duration: rollDuration(statusDef, playerState),
        values: rollValue(statusDef, playerState)
    };

    if (!statusDef.stackable) {
        target.statuses = target.statuses.filter(s => s.id !== statusId);
    }

    target.statuses.push(statusInstance);
}

export function rollValue(statusDef, _playerState) {
    if (!statusDef.effects) return {};
    const rolled = {};
    for (const [key, value] of Object.entries(statusDef.effects)) {
        rolled[key] = rollRangeOrPreset(value);
    }
    return rolled;
}
export function rollDuration(statusDef, _playerState) {
    if (!statusDef.duration) return 0;
    return rollRange(statusDef.duration);
}

export function processStatusesAtTurnEnd(entity) {
    for (const status of entity.statuses) {
        const statusDef = STATUSES[status.id];

        if (statusDef.effects.damagePerTurn) {
            entity.hp -= status.values["damagePerTurn"];
        }
        status.duration -= 1;
    }

    entity.statuses = entity.statuses.filter(s => s.duration > 0);
}
export function canAct(entity) {
    return !entity.statuses.some(s => {
        const def = STATUSES[s.id];
        return def.effects.skipTurn;
    });
}
