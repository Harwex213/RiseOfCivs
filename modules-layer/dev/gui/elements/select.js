import { GuiElement } from "../guiElement.js";

export class Select extends GuiElement {
    constructor({ id, placeholder }) {
        super(id);

        this._elementContainer = document.createElement("div");
        this._elementContainer.className = "container";

        this._element = document.createElement("select");
        this._element.id = this.id;
        this._element.className = "select";

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

    addOption(name, value) {
        const option = document.createElement("option");
        option.value = value;
        option.innerText = name;

        this._element.appendChild(option);
    }

    setValue(value) {
        this._element.value = value;
    }

    onChange(handler) {
        this._onChangeHandler = handler;
    }
}