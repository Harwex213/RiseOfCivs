export const MAP_MARKS = {
    EMPTY: 0,
    LAND: 1,
    COAST: 2,
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
    playersAmountToLandPercent = {
        2: null,
        3: null,
        4: null,
    };
    maxDistanceBetweenPlayers = null;
    emptyLandBoundary = null;
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
        this.mark = MAP_MARKS.EMPTY;
    }
}

export class Map {
    constructor(width, height) {
        this.width = Math.max(width, 0);
        this.height = Math.max(height, 0);

        this.matrix = Array.from(Array(this.width), (_, x) => {
            return Array.from(Array(this.height), (_, y) => new MapTile(x, y));
        });
        this.lands = [];
    }
}
