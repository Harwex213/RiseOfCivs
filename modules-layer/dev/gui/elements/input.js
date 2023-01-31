import { GuiElement } from "../guiElement.js";

export class Input extends GuiElement {
    constructor({ id, placeholder }) {
        super(id);

        this._elementContainer = document.createElement("div");
        this._elementContainer.className = "container";

        this._element = document.createElement("input");
        this._element.id = this.id;
        this._element.className = "input";

        this._createPlaceholder(placeholder);
        this._elementContainer.appendChild(this._element);

        this._element.addEventListener("change", async () => {
            await this._onChangeHandler(this._element.value);
        });
    }

    _createPlaceholder(content) {
        const placeholder = document.createElement("p");
        placeholder.className = "placeholder";
        placeholder.innerText = content;
        this._elementContainer.appendChild(placeholder);
    }

    get element() {
        return this._elementContainer;
    }

    onChange(handler) {
        this._onChangeHandler = handler;
    }
}
