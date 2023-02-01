export const mapSizeTypes = {
    SMALL: "small",
    MEDIUM: "medium",
    BIG: "big",
}

export const waterBalanceTypes = {
    LESS_WATER: "less-water",
    BALANCE: "balance",
    MORE_WATER: "more-water"
}

export const tileTypes = {
    SEA: "sea",
    LAKE: "lake",
    LAND: "land",
    COAST: "coast",
}

export const biomTypes = {
    TUNDRA: "tundra",
    DESERT: "desert",
    FLATLAND: "flatland",
    GRASSLAND: "grassland",
    MOUNTAIN: "mountain",
    NONE: "none",
}

export const areaTypes = {
    HILLS: "hills",
    JUNGLE: "jungle",
    FOREST: "forest",
    NONE: "none",
}

export const directionsTypes = {
    LEFT_DOWN: "left-down",
    RIGHT_DOWN: "right-down",
    RIGHT: "right",
    RIGHT_UP: "right-up",
    LEFT_UP: "left-up",
    LEFT: "left",
}

export const ODDR_DIRECTION_DIFFERENCES = [
    {
        [directionsTypes.LEFT_DOWN]: [-1, +1],
        [directionsTypes.RIGHT_DOWN]: [0, +1],
        [directionsTypes.RIGHT]: [+1,  0],
        [directionsTypes.RIGHT_UP]: [0, -1],
        [directionsTypes.LEFT_UP]: [-1, -1],
        [directionsTypes.LEFT]: [-1,  0],
    },
    {
        [directionsTypes.LEFT_DOWN]: [0, +1],
        [directionsTypes.RIGHT_DOWN]: [+1, +1],
        [directionsTypes.RIGHT]: [+1,  0],
        [directionsTypes.RIGHT_UP]: [+1, -1],
        [directionsTypes.LEFT_UP]: [0, -1],
        [directionsTypes.LEFT]: [-1,  0],
    },
];

export class MapTile {
    constructor(i = 0, j = 0, neighboringTiles) {
        this.i = i;
        this.j = j;
        this.tileType = tileTypes.SEA;
        this.biomType = biomTypes.NONE;
        this.areaType = areaTypes.NONE;
        this.neighboringTiles = neighboringTiles;
        this.partRegion = "none";
    }
    
    addRegionToMapTile(region) {
        this.partRegion = { regionIndex: region.index };
        region.tilesRegion.push([this.i, this.j]);
    }
}

export class MapRegion {
    constructor(regionIndex) {
        this.tilesRegion = [];
        this.index = regionIndex;
    }
}

export class Map {
    constructor(width, height, regionsAmount, regionSize) {
        this.width = Math.max(width, 0);
        this.height = Math.max(height, 0);

        this.matrix = Array.from(Array(this.width), (_, x) => {
            return Array.from(Array(this.height), (_, y) => {
                const parity = y & 1;
                const diff = ODDR_DIRECTION_DIFFERENCES[parity];
                const copyDiff = Object.assign({}, diff);
                
                Object.keys(copyDiff).forEach(direction => {
                    const neighboringTile = [x + copyDiff[direction][0], y + copyDiff[direction][1]];
                    copyDiff[direction] = (neighboringTile[0] >= 0 && neighboringTile[0] < this.width && 
                        neighboringTile[1] >= 0 && neighboringTile[1] < this.height) ? [neighboringTile[0], neighboringTile[1]] : "none"
                });
                
                return new MapTile(x, y, copyDiff)
            })
        });
        this.regions = Array.from(Array(regionsAmount), (_, regionIndex) => new MapRegion(regionIndex));
        this.lands = [];
    }
}
