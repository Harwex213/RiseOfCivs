import { normalizedNoise2D } from "../core/utils.js";

const nativeStrategy = {
    name: "Native strategy",
    createNoise: ({ noise2D, entries }) => {
        const noise = normalizedNoise2D(noise2D);
        const [x, y] = entries;
        return noise(x, y);
    },
    controls: [],
};

export default nativeStrategy;
