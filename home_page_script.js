import {saveGame} from './utils/state.js'

let currentScreen = "menu";
const startContent = document.getElementById("start_content");

render();


function setScreen(screen) {
    currentScreen = screen;
    render();
}

document.getElementById("start_new_btn").onclick = () => setScreen("newGame");
document.getElementById("load_previous_btn").onclick = () => setScreen("loadGame");


function render() {
    startContent.innerHTML = "";

    if (currentScreen === "menu") {
        startContent.innerHTML = `
                <p>Choose an option:</p>
            `;
    }
    else if (currentScreen === "newGame") {
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "nameInput";
        nameInput.placeholder = "Enter your name";
        startContent.appendChild(nameInput);
        nameInput.addEventListener("keydown", async (event) => {
            if (event.code === "Enter") {
                const { defaultState } = await import("./data/default_player_data.js");
                const newState = {
                    ...defaultState,
                    name: nameInput.value
                };
                console.log("New Game State:", newState);
                saveGame(newState);
                currentScreen = "gameMade";
                render();
            }
        });
    }
    else if (currentScreen === "loadGame") {
        const savedStateInput = document.createElement("input");
        savedStateInput.type = "file";
        savedStateInput.id = "fileInput";

        startContent.appendChild(savedStateInput);

        savedStateInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = () => {
                const state = JSON.parse(reader.result);
                saveGame(state);
                alert("game loaded");
                currentScreen = "gameMade";
                render();
            };

            reader.readAsText(file);
        });
    }
    else if (currentScreen === "gameMade") {
        startContent.remove();
        document.getElementById("start_options_div").remove();
        import("./main_game.js").then(core_module => {
            core_module.core_cycle();
        }).catch(err => console.error("poop load", err));
    }
}
