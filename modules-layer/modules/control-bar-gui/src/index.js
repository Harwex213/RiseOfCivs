import "./styles.css";
import { classNames } from "./constants.js";

export class GuiManager {
    #guiList = {};
    #container;

    constructor(containerSelector) {
        this.#container = document.querySelector(containerSelector);
        this.#container.classList.add(classNames.controlBarManager);
    }

    addGui(gui) {
        this.#guiList[gui.id] = gui;
        this.#container.appendChild(gui.element);
    }
}

export { Button } from "./elements/button.js";
export { Select } from "./elements/select.js";
export { Input } from "./elements/input.js";
export { Range } from "./elements/range.js";
export { Checkbox } from "./elements/checkbox.js";
