import { createSimplexNoise } from "./core/noise.js";
import { renderMap } from "./core/map.js";
import { config } from "./config.js";

export const action = () => {
    const matrix = createSimplexNoise(config.selectedNoiseCreationStrategy.createNoise);
    renderMap(matrix, config.selectedNoiseToColorStrategy.map);
}
