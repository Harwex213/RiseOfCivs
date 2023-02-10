import MapGenerator, { MapGenerationConfig } from "map-generator";
import { mapSizeTypes, waterBalanceTypes } from "../../modules/models/map.mjs";
import { changeableConfig } from "./changeableConfig.js";

const mapSizeTypeToDimensions = {
    [mapSizeTypes.SMALL]: { width: 40, height: 30, },
    [mapSizeTypes.MEDIUM]: { width: 60, height: 40, },
    [mapSizeTypes.BIG]: { width: 70, height: 60, },
};

const waterBalanceTypeToValues = {
    [waterBalanceTypes.LESS_WATER]: 0.3,
    [waterBalanceTypes.BALANCE]: 0.5,
    [waterBalanceTypes.MORE_WATER]: 0.7,
};

export const mapGeneratorConfig = new MapGenerationConfig();
mapGeneratorConfig.regionSize = 8;

export const generateMapAction = (seedRandom) => {
    mapGeneratorConfig.mapSizes = mapSizeTypeToDimensions[changeableConfig.mapSizes];
    mapGeneratorConfig.waterBalancePercent = waterBalanceTypeToValues[changeableConfig.waterBalanceType];
    const mapGenerator = new MapGenerator(mapGeneratorConfig);
    return mapGenerator.generateMap(seedRandom);
}
