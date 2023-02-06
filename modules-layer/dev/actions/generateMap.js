import MapGenerator, { MapGenerationConfig } from "map-generator";
import { mapSizeTypes, waterBalanceTypes } from "../../modules/models/map.mjs";

export const defaultMapGenerationConfigValues = {
    mapSizes: mapSizeTypes.SMALL,
    waterBalanceType: waterBalanceTypes.BALANCE,
}

export const mapSizeTypeToDimensions = {
    [mapSizeTypes.SMALL]: { width: 40, height: 30, },
    [mapSizeTypes.MEDIUM]: { width: 60, height: 40, },
    [mapSizeTypes.BIG]: { width: 70, height: 60, },
};

export const waterBalanceTypeToValues = {
    [waterBalanceTypes.LESS_WATER]: 0.3,
    [waterBalanceTypes.BALANCE]: 0.5,
    [waterBalanceTypes.MORE_WATER]: 0.7,
};

export const mapGeneratorConfig = new MapGenerationConfig();
mapGeneratorConfig.mapSizes = mapSizeTypeToDimensions[defaultMapGenerationConfigValues.mapSizes];
mapGeneratorConfig.waterBalancePercent = waterBalanceTypeToValues[defaultMapGenerationConfigValues.waterBalanceType];
mapGeneratorConfig.regionSize = 8;

export const generateMapAction = (seedRandom) => {
    const mapGenerator = new MapGenerator(mapGeneratorConfig);
    return mapGenerator.generateMap(seedRandom);
}
