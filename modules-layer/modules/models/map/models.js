import { tileTypes, biomTypes, areaTypes } from "./enums.js";
import { ODDR_DIRECTION_DIFFERENCES } from "./constants.js";

export class MapTile {
    constructor(row = 0, col = 0, neighboringTiles) {
        this.row = row;
        this.col = col;
        this.tileType = tileTypes.SEA;
        this.biomType = biomTypes.NONE;
        this.areaType = areaTypes.NONE;
        this.neighboringTiles = neighboringTiles;
        this.partRegion = "none";
    }

    addRegionToMapTile(region) {
        this.partRegion = { regionIndex: region.index };
        region.tilesRegion.push([this.row, this.col]);
    }
}

export class MapRegion {
    constructor(index, size) {
        this.tilesRegion = [];
        this.size = size;
        this.index = index;
    }
}

export class Map {
    constructor(width, height) {
        this.width = Math.max(width, 0);
        this.height = Math.max(height, 0);

        this.matrix = Array.from(Array(this.height), (_, row) => {
            return Array.from(Array(this.width), (_, col) => {
                const parity = row & 1;
                const diff = ODDR_DIRECTION_DIFFERENCES[parity];
                const copyDiff = Object.assign({}, diff);

                Object.keys(copyDiff).forEach(direction => {
                    const neighboringTile = [row + copyDiff[direction][0], col + copyDiff[direction][1]];
                    copyDiff[direction] = (neighboringTile[0] >= 0 && neighboringTile[0] < this.height &&
                        neighboringTile[1] >= 0 && neighboringTile[1] < this.width) ? [neighboringTile[0], neighboringTile[1]] : "none"
                });

                return new MapTile(row, col, copyDiff)
            })
        });
        this.regions = [];
        this.lands = [];
    }
}
