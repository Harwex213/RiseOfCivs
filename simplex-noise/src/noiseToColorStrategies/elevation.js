import { getPersistedConfig, persistConfig } from "../core/utils.js";
import { Range } from "control-bar-gui";
import { action } from "../action.js";

const CONSTANTS = {
    PERSIST_KEY: "elevation_color",
    THRESHOLD: {
        MIN: 0,
        MAX: 1,
        STEP: 0.0125
    }
}

const config = getPersistedConfig(CONSTANTS.PERSIST_KEY) ?? {
    threshold: {
        mountain: 0.3,
        hills: 0.1,
    }
};

const mountainThresholdRange = new Range({
    placeholder: "Mountain threshold",
    rangeOptions: {
        min: CONSTANTS.THRESHOLD.MIN,
        max: CONSTANTS.THRESHOLD.MAX,
        step: CONSTANTS.THRESHOLD.STEP
    },
});
mountainThresholdRange.onChange((threshold) => {
    config.threshold.mountain = threshold;
    persistConfig(config, CONSTANTS.PERSIST_KEY);
    action();
})
mountainThresholdRange.setValue(config.threshold.mountain);

const hillsThresholdRange = new Range({
    placeholder: "Hills threshold",
    rangeOptions: {
        min: CONSTANTS.THRESHOLD.MIN,
        max: CONSTANTS.THRESHOLD.MAX,
        step: CONSTANTS.THRESHOLD.STEP
    },
});
hillsThresholdRange.onChange((threshold) => {
    config.threshold.hills = threshold;
    persistConfig(config, CONSTANTS.PERSIST_KEY);
    action();
})
hillsThresholdRange.setValue(config.threshold.hills);

const noiseToElevationColorStrategy = {
    name: "Elevation color",
    map: (value) => {
        if (value > config.threshold.mountain) {
            return "rgba(0,0,0,1)"
        }
        if (value > config.threshold.hills) {
            return "rgba(0,0,0,0.5)"
        }

        return "rgba(0,0,0,0.05)";
    },
    controls: [
        mountainThresholdRange,
        hillsThresholdRange
    ],
}

export default noiseToElevationColorStrategy;
