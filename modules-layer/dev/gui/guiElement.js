export class GuiElement {
    constructor(id) {
        this.id = id ?? Math.random().toString(16).slice(2);
    }
}
