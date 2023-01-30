import { spriteSheetFrameTypes } from "../models.js";

export class MapRendererConfig {
    tileSize = null;
    appContainerId = null;
    appDimensions = { width: null, height: null };
    spriteSheetPath = null;
    spriteSheetFrameNames = {
        [spriteSheetFrameTypes.water]: null,
        [spriteSheetFrameTypes.plainland]: null,
        [spriteSheetFrameTypes.grassland]: null,
        [spriteSheetFrameTypes.desert]: null,
        [spriteSheetFrameTypes.mountain]: null,
        [spriteSheetFrameTypes.tundra]: null,
        [spriteSheetFrameTypes.forestGrassland]: null,
        [spriteSheetFrameTypes.forestPlainland]: null,
        [spriteSheetFrameTypes.forestTundra]: null,
        [spriteSheetFrameTypes.hillsDesert]: null,
        [spriteSheetFrameTypes.hillsGrassland]: null,
        [spriteSheetFrameTypes.hillsPlainland]: null,
        [spriteSheetFrameTypes.hillsTundra]: null,
        [spriteSheetFrameTypes.jungleGrassland]: null,
        [spriteSheetFrameTypes.junglePlainland]: null,
    };
}
