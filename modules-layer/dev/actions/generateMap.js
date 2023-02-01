import MapGenerator, { MapGenerationConfig } from "map-generator";
import { mapSizeTypes, waterBalanceTypes } from "../../modules/models/map.mjs";

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

const mapGeneratorConfig = new MapGenerationConfig();
mapGeneratorConfig.mapSizes = mapSizeTypeToDimensions[mapSizeTypes.SMALL];
mapGeneratorConfig.waterBalancePercent = waterBalanceTypeToValues[waterBalanceTypes.BALANCE];
mapGeneratorConfig.regionSize = 8;

const mapGenerator = new MapGenerator(mapGeneratorConfig);

export const generateMapAction = () => mapGenerator.generateMap();
