import { action, changeableConfig } from "./actions";
import { mapSizeTypes, waterBalanceTypes } from "../modules/models/map.mjs";
import { GuiManager, Select, Input, Button } from "./gui";

const guiManager = new GuiManager(".controlBar");

const regenerateButton = new Button({
    id: "regenerate-button",
    placeholder: "Regenerate (R)"
});
regenerateButton.onClick(action);
window.onkeydown = async (logKey) => {
    if (logKey.code === "KeyR") {
        await action();
    }
};
guiManager.addGui(regenerateButton);

const mapSizeSelect = new Select({
    placeholder: "Map size"
});
mapSizeSelect.addOption(mapSizeTypes.SMALL, mapSizeTypes.SMALL);
mapSizeSelect.addOption(mapSizeTypes.MEDIUM, mapSizeTypes.MEDIUM);
mapSizeSelect.addOption(mapSizeTypes.BIG, mapSizeTypes.BIG);
mapSizeSelect.setValue(changeableConfig.mapSizes);
mapSizeSelect.onChange(async (value) => {
    changeableConfig.mapSizes = value;
    await action();
})
guiManager.addGui(mapSizeSelect);

const waterBalanceSelect = new Select({
    placeholder: "Water balance"
});
waterBalanceSelect.addOption(waterBalanceTypes.LESS_WATER, waterBalanceTypes.LESS_WATER);
waterBalanceSelect.addOption(waterBalanceTypes.BALANCE, waterBalanceTypes.BALANCE);
waterBalanceSelect.addOption(waterBalanceTypes.MORE_WATER, waterBalanceTypes.MORE_WATER);
waterBalanceSelect.setValue(changeableConfig.waterBalanceType);
waterBalanceSelect.onChange(async (value) => {
    changeableConfig.waterBalanceType = value;
    await action();
})
guiManager.addGui(waterBalanceSelect);

const seedRandomInput = new Input({
    placeholder: "random seed"
})
seedRandomInput.onChange((value) => {
    if (value === "") {
        changeableConfig.seedRandom = undefined;
        return;
    }
    changeableConfig.seedRandom = value;
});
guiManager.addGui(seedRandomInput);

action();
