import { Range } from "control-bar-gui";
import { action } from "../action.js";
import { normalizedNoise2D, getPersistedConfig, persistConfig } from "../core/utils.js";

const CONSTANTS = {
    PERSIST_KEY: "weighted_sum",
    FIRST_NOISE: {
        FREQUENCY: {
            MIN: 0.05,
            MAX: 1,
            STEP: 0.025,
            DEFAULT: 0.1,
        },
    },
    SECOND_NOISE: {
        FREQUENCY: {
            MIN: 0.05,
            MAX: 4,
            STEP: 0.025,
            DEFAULT: 0.3,
        },
    },
    THIRD_NOISE: {
        FREQUENCY: {
            MIN: 0.05,
            MAX: 4,
            STEP: 0.025,
            DEFAULT: 0.6,
        }  
    },
    DEGREE: {
        MIN: 1,
        MAX: 10,
        STEP: 0.05
    }
};

const config = getPersistedConfig(CONSTANTS.PERSIST_KEY) ?? {
    weightOfNoises: {
        firstNoise: 1,
        secondNoise: 0.5,
        thirdNoise: 0.25,
    },
    firstNoise: {
        frequency: CONSTANTS.FIRST_NOISE.FREQUENCY.DEFAULT,
        weight: 1,
    },
    secondNoise: {
        frequency: CONSTANTS.SECOND_NOISE.FREQUENCY.DEFAULT,
        weight: 0.5,
    },
    thirdNoise: {
        frequency: CONSTANTS.THIRD_NOISE.FREQUENCY.DEFAULT,
        weight: 0.25,
    },
    degree: 1,
};

const firstNoiseFrequencyRange = new Range({
    placeholder: "First noise frequency",
    rangeOptions: {
        min: CONSTANTS.FIRST_NOISE.FREQUENCY.MIN,
        max: CONSTANTS.FIRST_NOISE.FREQUENCY.MAX,
        step: CONSTANTS.FIRST_NOISE.FREQUENCY.STEP
    },
});
firstNoiseFrequencyRange.onChange((frequency) => {
    config.firstNoise.frequency = frequency;
    persistConfig(config, CONSTANTS.PERSIST_KEY);
    action();
})
firstNoiseFrequencyRange.setValue(config.firstNoise.frequency);

const secondNoiseFrequencyRange = new Range({
    placeholder: "Second noise frequency",
    rangeOptions: {
        min: CONSTANTS.SECOND_NOISE.FREQUENCY.MIN,
        max: CONSTANTS.SECOND_NOISE.FREQUENCY.MAX,
        step: CONSTANTS.SECOND_NOISE.FREQUENCY.STEP
    },
});
secondNoiseFrequencyRange.onChange((frequency) => {
    config.secondNoise.frequency = frequency;
    persistConfig(config, CONSTANTS.PERSIST_KEY);
    action();
})
secondNoiseFrequencyRange.setValue(config.secondNoise.frequency);

const thirdNoiseFrequencyRange = new Range({
    placeholder: "Third noise frequency",
    rangeOptions: {
        min: CONSTANTS.THIRD_NOISE.FREQUENCY.MIN,
        max: CONSTANTS.THIRD_NOISE.FREQUENCY.MAX,
        step: CONSTANTS.THIRD_NOISE.FREQUENCY.STEP
    },
});
thirdNoiseFrequencyRange.onChange((frequency) => {
    config.thirdNoise.frequency = frequency;
    persistConfig(config, CONSTANTS.PERSIST_KEY);
    action();
})
thirdNoiseFrequencyRange.setValue(config.thirdNoise.frequency);

const degreeRange = new Range({
    placeholder: "Math.pow Degree",
    rangeOptions: {
        min: CONSTANTS.DEGREE.MIN,
        max: CONSTANTS.DEGREE.MAX,
        step: CONSTANTS.DEGREE.STEP,
    },
});
degreeRange.onChange((degree) => {
    config.degree = degree;
    persistConfig(config, CONSTANTS.PERSIST_KEY);
    action();
})
degreeRange.setValue(config.degree);

const weightedSumStrategy = {
    name: "Octaves",
    createNoise: ({ noise2D, noise2D_2, noise2D_3, entries }) => {
        const [x, y] = entries;
        const firstNoise = normalizedNoise2D(noise2D);
        const secondNoise = normalizedNoise2D(noise2D_2);
        const thirdNoise = normalizedNoise2D(noise2D_3);

        let noiseValue = (
            config.weightOfNoises.firstNoise * firstNoise(config.firstNoise.frequency * x, config.firstNoise.frequency * y)
            + config.weightOfNoises.secondNoise * secondNoise(config.secondNoise.frequency * x, config.secondNoise.frequency * y)
            + config.weightOfNoises.thirdNoise * thirdNoise(config.thirdNoise.frequency * x, config.thirdNoise.frequency * y)
        );

        noiseValue /= (config.firstNoise.weight + config.secondNoise.weight + config.thirdNoise.weight);

        return Math.pow(noiseValue, config.degree);
    },
    controls: [
        firstNoiseFrequencyRange,
        secondNoiseFrequencyRange,
        thirdNoiseFrequencyRange,
        degreeRange,
    ],
};

export default weightedSumStrategy;
