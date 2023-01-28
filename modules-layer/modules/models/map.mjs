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
    EVEN_ODD_LEFT: "even-odd-left",
    EVEN_ODD_RIGHT: "even-odd-right",
    EVEN_RIGHT_UP: "even-right-up",
    EVEN_RIGHT_DOWN: "even-right-down",
    EVEN_LEFT_UP: "even-left-up",
    EVEN_LEFT_DOWN: "even-left-down",
    ODD_RIGHT_UP: "odd-right-up",
    ODD_RIGHT_DOWN: "odd-right-down",
    ODD_LEFT_UP: "odd-left-up",
    ODD_LEFT_DOWN: "odd-left-down",
}

const up = [0, -1];
const down = [0, 1];
const left = [-1, 0];
const right = [1, 0];
const leftUp = [left[0], up[1]];
const rightUp = [right[0], up[1]];
const leftDown = [left[0], down[1]];
const rightDown = [right[0], down[1]];
export const SINGLE_VECTORS = {
    UP: up,
    DOWN: down,
    LEFT: left,
    RIGHT: right,
    LEFT_UP: leftUp,
    RIGHT_UP: rightUp,
    LEFT_DOWN: leftDown,
    RIGHT_DOWN: rightDown,
}

export const ODDR_DIRECTION_DIFFERENCES = [
    {
        [directionsTypes.EVEN_ODD_LEFT]: [-1,  0],
        [directionsTypes.EVEN_ODD_RIGHT]: [+1,  0],
        [directionsTypes.EVEN_RIGHT_UP]: [0, -1],
        [directionsTypes.EVEN_RIGHT_DOWN]: [0, +1],
        [directionsTypes.EVEN_LEFT_UP]: [-1, -1],
        [directionsTypes.EVEN_LEFT_DOWN]: [-1, +1],
    },
    {
        [directionsTypes.EVEN_ODD_LEFT]: [-1,  0],
        [directionsTypes.EVEN_ODD_RIGHT]: [+1,  0],
        [directionsTypes.ODD_RIGHT_UP]: [+1, -1],
        [directionsTypes.ODD_RIGHT_DOWN]: [+1, +1],
        [directionsTypes.ODD_LEFT_UP]: [0, -1],
        [directionsTypes.ODD_LEFT_DOWN]: [0, +1],
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
    }
}

export class MapRegion {
    constructor(regionSize) {
        this.tilesRegion = Array(regionSize);
    }
}

export class Map {
    constructor(width, height, regionsAmount, regionSize) {
        this.width = Math.max(width, 0);
        this.height = Math.max(height, 0);

        this.matrix = Array.from(Array(this.width), (_, x) => {
            return Array.from(Array(this.height), (_, y) => {
                const parity = x & 1;
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
        this.regions = Array.from(Array(regionsAmount), (_) => new MapRegion(regionSize));
        this.lands = [];
    }
}
