import { debounce } from "../utils.js";
import { generateMapAction } from "./generateMap.js";
import { renderMapAction } from "./renderMap.js";

export const seedRandom = {
    value: undefined
};

export const action = debounce(async () => {
    const map = generateMapAction(seedRandom.value);
    await renderMapAction(map);
});
