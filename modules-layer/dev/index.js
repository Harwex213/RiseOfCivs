import { generateMapAction } from "./actions/generateMap.js";
import { renderMapAction } from "./actions/renderMap.js";

const map = generateMapAction();
renderMapAction(map);
