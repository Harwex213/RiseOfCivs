import { GuiElement } from "../guiElement.js";

export class Button extends GuiElement {
    constructor({ id, placeholder }) {
        super(id);

        this._element = document.createElement("button");
        this._element.id = this.id;
        this._element.className = "button";
        this._element.innerText = placeholder;

        this._element.addEventListener("click", async () => {
            await this._onClickHandler();
        });
    }

    get element() {
        return this._element;
    }

    onClick(handler) {
        this._onClickHandler = handler;
    }
}
