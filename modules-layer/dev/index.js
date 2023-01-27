import MapGenerator from "map-generator";
import renderMap from "map-renderer";
import { MapGenerationConfig, MapRenderConfig } from "../modules/models/map.mjs";

const mapGeneratorConfig = new MapGenerationConfig();
mapGeneratorConfig.mapSizeTypeToResolution = {
    SMALL: [40, 30],
    MEDIUM: [60, 40],
    BIG: [70, 60],
}
mapGeneratorConfig.waterBalanceTypeValues = {
    LESSWATER: 0.3,
    BALANCE: 0.5,
    MOREWATER: 0.7,
}
mapGeneratorConfig.waterBalanceValue = mapGeneratorConfig.waterBalanceTypeValues.LESSWATER;
mapGeneratorConfig.mapSizes = { width: mapGeneratorConfig.mapSizeTypeToResolution.SMALL[0], 
    height: mapGeneratorConfig.mapSizeTypeToResolution.SMALL[1] };
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
