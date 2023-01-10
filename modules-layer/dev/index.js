import MapGenerator from "map-generator";
import renderMap from "map-renderer";
import { MapGenerationConfig, MapRenderConfig } from "../modules/models/map.mjs";

const mapGeneratorConfig = new MapGenerationConfig();
mapGeneratorConfig.mapSizes = { width: 60, height: 60 };
mapGeneratorConfig.playersAmountToLandPercent = {
    2: 0.15,
    3: 0.3,
    4: 0.45,
}
mapGeneratorConfig.emptyLandBoundary = 4;
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
