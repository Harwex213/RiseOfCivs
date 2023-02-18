import {GuiManager, Select} from "control-bar-gui";
import {DEFAULT_NOISE_CREATION_STRATEGY, noiseCreationStrategies} from "./noiseCreationStrategies";
import {DEFAULT_NOISE_TO_COLOR_STRATEGY, noiseToColorStrategies} from "./noiseToColorStrategies/index.js";
import {replaceGuis} from "./core/utils.js";
import {action} from "./action.js";
import {config} from "./config.js";

const guiManager = new GuiManager(".controlBar");

const noiseCreationStrategySelect = new Select({ placeholder: "noise creation strategy" });
for (const [strategyKey, strategy] of Object.entries(noiseCreationStrategies)) {
    noiseCreationStrategySelect.addOption(strategy.name, strategyKey);
}
noiseCreationStrategySelect.setValue(DEFAULT_NOISE_CREATION_STRATEGY);
noiseCreationStrategySelect.onChange((strategyKey) => {
    const newStrategy = noiseCreationStrategies[strategyKey];
    const oldStrategy = config.selectedNoiseCreationStrategy;
    replaceGuis(guiManager, oldStrategy.controls, newStrategy.controls);
    config.selectedNoiseCreationStrategy = newStrategy;
    action();
})
guiManager.addGui(noiseCreationStrategySelect);
config.selectedNoiseCreationStrategy = noiseCreationStrategies[DEFAULT_NOISE_CREATION_STRATEGY];

const noiseToColorStrategySelect = new Select({ placeholder: "noise to color strategy" });
for (const [strategyKey, strategy] of Object.entries(noiseToColorStrategies)) {
    noiseToColorStrategySelect.addOption(strategy.name, strategyKey);
}
noiseToColorStrategySelect.setValue(DEFAULT_NOISE_TO_COLOR_STRATEGY);
noiseToColorStrategySelect.onChange((strategyKey) => {
    const newStrategy = noiseToColorStrategies[strategyKey];
    const oldStrategy = config.selectedNoiseToColorStrategy;
    replaceGuis(guiManager, oldStrategy.controls, newStrategy.controls);
    config.selectedNoiseToColorStrategy = newStrategy;
    action();
})
guiManager.addGui(noiseToColorStrategySelect);
config.selectedNoiseToColorStrategy = noiseToColorStrategies[DEFAULT_NOISE_TO_COLOR_STRATEGY];

replaceGuis(guiManager, [], config.selectedNoiseCreationStrategy.controls);
replaceGuis(guiManager, [], config.selectedNoiseToColorStrategy.controls);
action();

// const HILLS_RATIO = 0.6;
// const MOUNTAIN_RATIO = 0.8;
// const validateHills = (matrix) => {
//     const data = matrix.reduce((prev, next) => prev.concat(next));
//    
//     const hills = data.filter(value => value >= HILLS_RATIO).length;
//     const mountains = data.filter(value => value >= MOUNTAIN_RATIO).length;
//
//     return [hills, mountains];
// };
//
// const validation = validateHills(matrix);
// console.log(`Hills = ${validation[0]}. Mountains = ${validation[1]}.`)
