import nativeStrategy from "./native.js";
import nativeWithFrequencyStrategy from "./nativeWithFrequency.js";
import weightedSumStrategy from "./weightedSum.js";

export const noiseCreationStrategies = {
    nativeStrategy,
    nativeWithFrequencyStrategy,
    weightedSumStrategy,
};

export const DEFAULT_NOISE_CREATION_STRATEGY = "weightedSumStrategy";
