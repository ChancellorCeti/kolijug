import {getEquippedWeapon} from "../utils/state.js"
import {rollRange} from "../utils/general_utils.js"
import {WEAPONS} from "../data/items/weapons.js"

export function attack(attacker, defender) {
    const weaponID = getEquippedWeapon(attacker).id;
    const weaponDef = WEAPONS[weaponID];

    if (Math.random() > weaponDef.accuracy) {
        return { hit: false };
    }
    let dmg = rollRange(weaponDef.damage);
    if (Math.random() < weaponDef.critChance) {
        dmg *= weaponDef.critMultiplier;
    }

    // apply statuses / modifiers
    //dmg = applyModifiers(dmg, attacker, defender, weaponDef);

    defender.hp -= Math.floor(dmg);

    if (weaponDef.onHit) {
        weaponDef.onHit(attacker, defender);
    }

    return { hit: true, damage: dmg };
}
