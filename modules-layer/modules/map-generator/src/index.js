import { Map, tileTypes, biomTypes, areaTypes } from "../../models/map.mjs";
import Randomizer from "./randomizer.js";
import { createNoise2D } from 'simplex-noise';

export class MapGenerationConfig {
    regionSize = null;
    mapSizes = null;
    waterBalancePercent = null;
}

export default class MapGenerator {
    constructor(config) {
        this._config = {
            regionSize: config.regionSize,
            mapSizes: { ...config.mapSizes },
            waterBalancePercent: config.waterBalancePercent,
        };
        this._calculateParams();
    }

    _calculateParams() {
        const { regionSize, mapSizes, waterBalancePercent } = this._config;

        const totalTilesAmount = mapSizes.width * mapSizes.height;
        const landTilesAmount = totalTilesAmount - (totalTilesAmount * waterBalancePercent);
        const regionsAmount = Math.trunc(landTilesAmount / regionSize);

        this._params = {
            mapSizes,
            regionsAmount,
            centerPoint: [mapSizes.height / 2 - 1, mapSizes.width / 2 - 1],
        };
    }

    generateMap(randomSeed) {
        const { regionSize } = this._config;
        const { mapSizes, centerPoint, regionsAmount } = this._params;
        const randomizer = new Randomizer(randomSeed);

        const map = new Map(mapSizes.width, mapSizes.height, regionsAmount);
        const coasts = {
            addCoast(tile) {
                map.matrix[tile[0]][tile[1]].tileType = tileTypes.COAST;
            },
            removeCoast(tile) {
                map.matrix[tile[0]][tile[1]].tileType = tileTypes.LAND;
            },
            getArrCoasts() {
                const arrCoasts = [];
                map.matrix.forEach((height) => {
                    height.forEach((tile) => {
                        if (tile.tileType === tileTypes.COAST) {
                            arrCoasts.push([tile.row, tile.col]);
                        }
                    });
                });
                
                return arrCoasts;
            },
            randomCoast() {
                const arrCoasts = this.getArrCoasts();
                return arrCoasts[randomizer.getRandom(arrCoasts.length)];
            },
        };
        const assignedForRegion = {
            tilesForRegion: [],
            addTile(tile) {
                this.tilesForRegion.push([tile[0], tile[1]]);
            },
            clearTilesForRegion() {
                this.tilesForRegion.length = 0;
            },
            sendTilesToRegion(region) {
                this.tilesForRegion.forEach(tile => {
                    map.matrix[tile[0]][tile[1]].addRegionToMapTile(map.regions[region]);
                    map.lands.push(map.matrix[tile[0]][tile[1]]);
                });
            },
        };
        const tileCounter = {
            tileNumber: 0,
            addTile() {
                this.tileNumber++;
            },
            clearTile() {
                this.tileNumber = 0;
            },
        };
        const possibleDirections = {
            allDirections: [],
            currentDirections: [],
            clearCurrentDirections() {
                this.currentDirections.length = 0;
            },
            clearAllDirections() {
                this.allDirections.length = 0;
            },
            checkDirections(point) {
                Object.keys(map.matrix[point[0]][point[1]].neighboringTiles).forEach(direction => {
                    const tileDirection = map.matrix[point[0]][point[1]].neighboringTiles[direction];
                
                    if (tileDirection !== "none" && map.matrix[tileDirection[0]][tileDirection[1]].tileType === tileTypes.COAST) {
                        this.currentDirections.push(tileDirection);
                    }
                });
            },
            getRandomDirection(directions) {
                const randomIndex = randomizer.getRandom(directions.length);
                const chosenDirection = directions[randomIndex];
                directions.splice(randomIndex, 1);
                
                return chosenDirection;
            },
            checkSameDirections() {
                const temporarySet = new Set(this.allDirections.map(tileDirection => map.matrix[tileDirection[0]][tileDirection[1]]));
                this.clearAllDirections();
                for (const tileDirection of temporarySet) {
                    if (tileDirection.tileType !== tileTypes.LAND) {
                        this.allDirections.push([tileDirection.row, tileDirection.col]);
                    }
                }
            },
            addCurrentToAllDirections() {
                this.allDirections.push(...this.currentDirections);
                this.checkSameDirections();
            },
        };

        const tileTypeCoast = (point) => {
            Object.keys(map.matrix[point[0]][point[1]].neighboringTiles).forEach(direction => {
                const tileDirection = map.matrix[point[0]][point[1]].neighboringTiles[direction];
                
                if (tileDirection !== "none" && map.matrix[tileDirection[0]][tileDirection[1]].tileType === tileTypes.SEA) {
                    coasts.addCoast(tileDirection);
                }
            });
        }
        
        coasts.addCoast(centerPoint);
        
        const branchNoAllDirections = () => {
            if (tileCounter.tileNumber > 0) {
                assignedForRegion.tilesForRegion.forEach(tile => {
                    map.matrix[tile[0]][tile[1]].tileType = tileTypes.LAKE;
                });
                
                assignedForRegion.clearTilesForRegion();
                tileCounter.clearTile();
            } 
            
            const coast = coasts.randomCoast();
            centerPoint[0] = coast[0];
            centerPoint[1] = coast[1];
            coasts.removeCoast(coast);
        }
        
        const branchNoCurrentDirections = () => {
            const chosenDirection = possibleDirections.getRandomDirection(possibleDirections.allDirections);
            if (typeof chosenDirection === "undefined") {
                branchNoAllDirections();
            } else {
                centerPoint[0] = chosenDirection[0];
                centerPoint[1] = chosenDirection[1];
                coasts.removeCoast(chosenDirection);
            }
        }

        for (let region = 0; region < regionsAmount; region++) {
            for (tileCounter; tileCounter.tileNumber < regionSize; tileCounter.addTile()) {
                possibleDirections.clearCurrentDirections();
                possibleDirections.checkDirections(centerPoint);
                const chosenDirection = possibleDirections.getRandomDirection(possibleDirections.currentDirections);
                possibleDirections.addCurrentToAllDirections();

                if (typeof chosenDirection === "undefined") {
                    branchNoCurrentDirections();
                } else {
                    centerPoint[0] = chosenDirection[0];
                    centerPoint[1] = chosenDirection[1];
                    coasts.removeCoast(centerPoint);
                }

                tileTypeCoast(centerPoint);
                assignedForRegion.addTile(centerPoint);
            }
            
            assignedForRegion.sendTilesToRegion(region);
            assignedForRegion.clearTilesForRegion();
            possibleDirections.clearAllDirections();
            tileCounter.clearTile();
        }
        
        const elevationAssignment = (elevation, tile) => {
            if (elevation > 0.90) {
                tile.biomType = biomTypes.MOUNTAIN;
            } else if (elevation > 0.60) {
                tile.areaType = areaTypes.HILLS;
            } 
        }
        const moistureAndTemperatureAssignment = (moisture, temperature, tile) => {
            if (temperature > 2) {
                if (moisture > 0.55) {
                    tile.biomType = biomTypes.GRASSLAND;
                } else if (moisture > 0.25) {
                    tile.biomType = biomTypes.FLATLAND;
                } else {
                    tile.biomType = biomTypes.DESERT;
                }
            } else if (temperature > 0.5) {
                if (moisture > 0.5) {
                    tile.biomType = biomTypes.GRASSLAND;
                } else {
                    tile.biomType = biomTypes.FLATLAND;
                }
            } else {
                if (moisture > 0.75) {
                    tile.biomType = biomTypes.FLATLAND;
                } else {
                    tile.biomType = biomTypes.TUNDRA;
                }
            }
        }
        const genE = createNoise2D();
        const genM = createNoise2D();
        const genT = createNoise2D();
        const noiseE = (nRow, nCol) => genE(nRow, nCol) / 2 + 0.5;
        const noiseM = (nRow, nCol) => genM(nRow, nCol) / 2 + 0.5;
        const noiseT = (nRow, nCol) => genT(nRow, nCol) / 2 + 0.5;
        const poles = -1;
        const equator = 3.5;
        
        for (let row = 0; row < mapSizes.height; row++) {
            for (let col = 0; col < mapSizes.width; col++) {      
                const nRow = row/mapSizes.height - 0.5;
                const nCol = col/mapSizes.width - 0.5;
                
                const e = noiseE(4.0 * nRow, 4.0 * nCol);
                const moisture = noiseM(4.0 * nRow, 4.0 * nCol);
                const temperature = noiseT(4.0 * nRow, 4.0 * nCol);
                const normalizedTemperature = temperature * temperature 
                    + poles 
                    + equator * Math.sin(Math.PI * (col / mapSizes.height));
                
                if (map.matrix[row][col].partRegion !== 'none') {
                    elevationAssignment(e, map.matrix[row][col]);
                    
                    if (map.matrix[row][col].biomType !== biomTypes.MOUNTAIN) {
                        moistureAndTemperatureAssignment(moisture, normalizedTemperature, map.matrix[row][col]);
                    }
                }
            }
        }
        
        return map;
    }
}
