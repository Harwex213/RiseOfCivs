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

export class MapGenerationConfig {
    mapSizes = { width: null, height: null };
    regionSize = null;
    playersAmount = null;
    mapSizeTypeToResolution = {
        SMALL: null,
        MEDIUM: null,
        BIG: null,
    };
    waterBalanceValue = null;
    waterBalanceTypeValues = {
        LESSWATER: null,
        BALANCE: null,
        MOREWATER: null,
    };
    maxDistanceBetweenPlayers = null;
    seaLandBoundary = null;
}

export class MapRenderConfig {
    tileSize = null;
    canvasContainer = null;
    canvasRes = { width: null, height: null };
}

export class MapTile {
    constructor(i = 0, j = 0) {
        this.i = i;
        this.j = j;
        this.tileType = tileTypes.SEA;
        this.biomType = biomTypes.NONE;
        this.areaType = areaTypes.NONE;
        
        this._calculateNeighborsTiles();
    }
    
    _calculateNeighborsTiles() {
        
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
            return Array.from(Array(this.height), (_, y) => new MapTile(x, y));
        });
        this.regions = Array.from(Array(regionsAmount), (_) => new MapRegion(regionSize));
        this.lands = [];
    }
}
