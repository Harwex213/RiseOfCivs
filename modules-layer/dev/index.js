import MapGenerator, { MapGenerationConfig } from "map-generator";
import renderMap, { MapRenderConfig } from "map-renderer";
import { mapSizeTypes, waterBalanceTypes } from "../modules/models/map.mjs";

const mapGeneratorConfig = new MapGenerationConfig();
mapGeneratorConfig.mapSizeTypeToDimensions = {
    [mapSizeTypes.SMALL]: [40, 30],
    [mapSizeTypes.MEDIUM]: [60, 40],
    [mapSizeTypes.BIG]: [70, 60],
}
mapGeneratorConfig.waterBalanceTypeToValues = {
    [waterBalanceTypes.LESS_WATER]: 0.3,
    [waterBalanceTypes.BALANCE]: 0.5,
    [waterBalanceTypes.MORE_WATER]: 0.7,
}
mapGeneratorConfig.waterBalanceType = waterBalanceTypes.BALANCE;
mapGeneratorConfig.mapSizeType = mapSizeTypes.SMALL;
mapGeneratorConfig.seaLandBoundary = 4;
mapGeneratorConfig.playersAmount = 2;
mapGeneratorConfig.maxDistanceBetweenPlayers = 10;
mapGeneratorConfig.regionSize = 8;

const mapGenerator = new MapGenerator(mapGeneratorConfig);
const map = mapGenerator.generateMap();

const mapRenderConfig = new MapRenderConfig();
mapRenderConfig.tileSize = 16;
mapRenderConfig.canvasContainer = "container";
mapRenderConfig.canvasRes = { width: 1920, height: 1080 };

renderMap(map, mapRenderConfig);
