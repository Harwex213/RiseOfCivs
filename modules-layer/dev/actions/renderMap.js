import { MapRenderer, MapRendererConfig, spriteSheetFrameTypes } from "map-renderer";
import { areaTypes, biomTypes, tileTypes } from "../../modules/models/map.mjs";
import spriteSheetAtlasData from "../../dev-dist/assets/spritesheet.json";

export const mapRendererConfig = new MapRendererConfig();
mapRendererConfig.tileSize = 43;
mapRendererConfig.app = {
    containerId: "container",
};
mapRendererConfig.spriteSheet = {
    atlasData: spriteSheetAtlasData,
    textureNames: {
        [spriteSheetFrameTypes.WATER]: "water",
        [spriteSheetFrameTypes.FLATLAND]: "plainland",
        [spriteSheetFrameTypes.GRASSLAND]: "grassland",
        [spriteSheetFrameTypes.DESERT]: "desert",
        [spriteSheetFrameTypes.MOUNTAIN]: "mountain",
        [spriteSheetFrameTypes.TUNDRA]: "tundra",
        [spriteSheetFrameTypes.FOREST_GRASSLAND]: "forest_grassland",
        [spriteSheetFrameTypes.FOREST_FLATLAND]: "forest_plainland",
        [spriteSheetFrameTypes.FOREST_TUNDRA]: "forest_tundra",
        [spriteSheetFrameTypes.HILLS_DESERT]: "hills_desert",
        [spriteSheetFrameTypes.HILLS_GRASSLAND]: "hills_grassland",
        [spriteSheetFrameTypes.HILLS_FLATLAND]: "hills_plainland",
        [spriteSheetFrameTypes.HILLS_TUNDRA]: "hills_tundra",
        [spriteSheetFrameTypes.JUNGLE_GRASSLAND]: "jungle_grassland",
        [spriteSheetFrameTypes.JUNGLE_FLATLAND]: "jungle_plainland",
    }
};
mapRendererConfig.viewport = {
    minScale: null,
    maxScale: null,
};

const setDevTileInfo = (map) => {
    // all bioms without areas
    map.matrix[0][0].tileType = tileTypes.LAND;
    map.matrix[0][0].biomType = biomTypes.GRASSLAND;

    map.matrix[1][0].tileType = tileTypes.LAND;
    map.matrix[1][0].biomType = biomTypes.FLATLAND;

    map.matrix[2][0].tileType = tileTypes.LAND;
    map.matrix[2][0].biomType = biomTypes.TUNDRA;

    map.matrix[3][0].tileType = tileTypes.LAND;
    map.matrix[3][0].biomType = biomTypes.DESERT;

    map.matrix[4][0].tileType = tileTypes.LAND;
    map.matrix[4][0].biomType = biomTypes.MOUNTAIN;

    //  all bioms with forest
    map.matrix[0][1].tileType = tileTypes.LAND;
    map.matrix[0][1].biomType = biomTypes.GRASSLAND;
    map.matrix[0][1].areaType = areaTypes.FOREST;

    map.matrix[1][1].tileType = tileTypes.LAND;
    map.matrix[1][1].biomType = biomTypes.FLATLAND;
    map.matrix[1][1].areaType = areaTypes.FOREST;

    map.matrix[2][1].tileType = tileTypes.LAND;
    map.matrix[2][1].biomType = biomTypes.TUNDRA;
    map.matrix[2][1].areaType = areaTypes.FOREST;

    // all bioms with jungle
    map.matrix[0][2].tileType = tileTypes.LAND;
    map.matrix[0][2].biomType = biomTypes.GRASSLAND;
    map.matrix[0][2].areaType = areaTypes.JUNGLE;

    map.matrix[1][2].tileType = tileTypes.LAND;
    map.matrix[1][2].biomType = biomTypes.FLATLAND;
    map.matrix[1][2].areaType = areaTypes.JUNGLE;

    // all bioms with hills
    map.matrix[0][3].tileType = tileTypes.LAND;
    map.matrix[0][3].biomType = biomTypes.GRASSLAND;
    map.matrix[0][3].areaType = areaTypes.HILLS;

    map.matrix[1][3].tileType = tileTypes.LAND;
    map.matrix[1][3].biomType = biomTypes.FLATLAND;
    map.matrix[1][3].areaType = areaTypes.HILLS;

    map.matrix[2][3].tileType = tileTypes.LAND;
    map.matrix[2][3].biomType = biomTypes.TUNDRA;
    map.matrix[2][3].areaType = areaTypes.HILLS;

    map.matrix[3][3].tileType = tileTypes.LAND;
    map.matrix[3][3].biomType = biomTypes.DESERT;
    map.matrix[3][3].areaType = areaTypes.HILLS;
}

const mapRenderer = new MapRenderer(mapRendererConfig);

export const renderMapAction = async (map) => {
    //setDevTileInfo(map);
    await mapRenderer.render(map);
}
