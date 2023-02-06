import { action, seedRandom } from "./actions";
import { mapSizeTypes, waterBalanceTypes } from "../modules/models/map.mjs";
import {
    defaultMapGenerationConfigValues,
    mapGeneratorConfig,
    mapSizeTypeToDimensions,
    waterBalanceTypeToValues,
} from "./actions/generateMap.js";
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
mapSizeSelect.setValue(defaultMapGenerationConfigValues.mapSizes);
mapSizeSelect.onChange(async (value) => {
    mapGeneratorConfig.mapSizes = mapSizeTypeToDimensions[value];
    await action();
})
guiManager.addGui(mapSizeSelect);

const waterBalanceSelect = new Select({
    placeholder: "Water balance"
});
waterBalanceSelect.addOption(waterBalanceTypes.LESS_WATER, waterBalanceTypes.LESS_WATER);
waterBalanceSelect.addOption(waterBalanceTypes.BALANCE, waterBalanceTypes.BALANCE);
waterBalanceSelect.addOption(waterBalanceTypes.MORE_WATER, waterBalanceTypes.MORE_WATER);
waterBalanceSelect.setValue(defaultMapGenerationConfigValues.waterBalanceType);
waterBalanceSelect.onChange(async (value) => {
    mapGeneratorConfig.waterBalancePercent = waterBalanceTypeToValues[value];
    await action();
})
guiManager.addGui(waterBalanceSelect);

const seedRandomInput = new Input({
    placeholder: "random seed"
})
seedRandomInput.onChange((value) => {
    if (value === "") {
        seedRandom.value = undefined;
        return;
    }
    seedRandom.value = value;
});
guiManager.addGui(seedRandomInput);

action();
