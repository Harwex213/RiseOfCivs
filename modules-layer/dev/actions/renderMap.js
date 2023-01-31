import { MapRenderer, MapRendererConfig, spriteSheetFrameTypes } from "map-renderer";
import spriteSheetAtlasData from "../../dev-dist/assets/spritesheet.json";

export const mapRendererConfig = new MapRendererConfig();
mapRendererConfig.tileSize = 43;
mapRendererConfig.app = {
    containerId: "container",
};
mapRendererConfig.spriteSheet = {
    atlasData: spriteSheetAtlasData,
    textureNames: {
        [spriteSheetFrameTypes.water]: "water",
        [spriteSheetFrameTypes.plainland]: "plainland",
        [spriteSheetFrameTypes.grassland]: "grassland",
        [spriteSheetFrameTypes.desert]: "desert",
        [spriteSheetFrameTypes.mountain]: "mountain",
        [spriteSheetFrameTypes.tundra]: "tundra",
        [spriteSheetFrameTypes.forestGrassland]: "forest_grassland",
        [spriteSheetFrameTypes.forestPlainland]: "forest_plainland",
        [spriteSheetFrameTypes.forestTundra]: "forest_tundra",
        [spriteSheetFrameTypes.hillsDesert]: "hills_desert",
        [spriteSheetFrameTypes.hillsGrassland]: "hills_grassland",
        [spriteSheetFrameTypes.hillsPlainland]: "hills_plainland",
        [spriteSheetFrameTypes.hillsTundra]: "hills_tundra",
        [spriteSheetFrameTypes.jungleGrassland]: "jungle_grassland",
        [spriteSheetFrameTypes.junglePlainland]: "jungle_plainland",
    }
};
mapRendererConfig.viewport = {
    minScale: null,
    maxScale: null,
};

const mapRenderer = new MapRenderer(mapRendererConfig);

export const renderMapAction = async (map) => {
    mapRenderer.clean();
    await mapRenderer.render(map);
}
