import { debounce } from "../utils.js";
import { generateMapAction } from "./generateMap.js";
import { renderMapAction } from "./renderMap/renderMap.js";
import { changeableConfig } from "./changeableConfig.js";

export { changeableConfig } from "./changeableConfig.js";

export const action = debounce(async () => {
    const map = generateMapAction(changeableConfig.seedRandom);
    await renderMapAction(map);
});
