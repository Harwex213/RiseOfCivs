import { Range } from "control-bar-gui";
import { action } from "../action.js";
import {normalizedNoise2D} from "../core/utils.js";

const MIN_FREQUENCY = 1;
const MAX_FREQUENCY = 16;
const STEP_FREQUENCY = 1;

const config = {
    frequency: MIN_FREQUENCY,
};

const frequencyRange = new Range({
    placeholder: "Frequency",
    rangeOptions: { min: MIN_FREQUENCY, max: MAX_FREQUENCY, step: STEP_FREQUENCY }
});
frequencyRange.onChange((frequency) => {
    config.frequency = frequency;
    action();
})
frequencyRange.setValue(MIN_FREQUENCY);

const nativeWithFrequencyStrategy = {
    name: "Native with frequency strategy",
    createNoise: ({ noise2D, entries }) => {
        const noise = normalizedNoise2D(noise2D);
        const [x, y] = entries;
        return noise(config.frequency * x, config.frequency * y);
    },
    controls: [frequencyRange],
};

export default nativeWithFrequencyStrategy;
