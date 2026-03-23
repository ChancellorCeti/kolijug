export function saveGame(state) {
    localStorage.setItem("gameSave", JSON.stringify(state));
}

export function loadGame() {
    const data = localStorage.getItem("gameSave");
    return data ? JSON.parse(data) : null;
}

export function exportSave(state) {
    const blob = new Blob(
        [JSON.stringify(state, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "savegame.json";
    a.click();

    URL.revokeObjectURL(url);
}
export function getEquippedWeapon(playerState) {
    for (let i = 0; i < playerState.equippedItems.length; i++) {
        if (playerState.equippedItems[i].type === "weapon") {
            return playerState.equippedItems[i];
        }
    }
    return null;
}
