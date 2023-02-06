export class GuiManager {
    constructor(containerSelector) {
        this._guiList = {};
        this._container = document.querySelector(containerSelector);
    }

    addGui(gui) {
        this._guiList[gui.id] = gui;
        this._container.appendChild(gui.element);

        return name;
    }
}
