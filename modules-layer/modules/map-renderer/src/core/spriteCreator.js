import { Sprite } from "pixi.js";
import { areaTypes, biomTypes, tileTypes } from "../../../models/map.mjs";
import { spriteSheetFrameTypes } from "../constants.js";

const areaTypeToSpriteSheetFrameType = {
    [areaTypes.NONE]: {
        [biomTypes.DESERT]: spriteSheetFrameTypes.DESERT,
        [biomTypes.FLATLAND]: spriteSheetFrameTypes.FLATLAND,
        [biomTypes.GRASSLAND]: spriteSheetFrameTypes.GRASSLAND,
        [biomTypes.MOUNTAIN]: spriteSheetFrameTypes.MOUNTAIN,
        [biomTypes.TUNDRA]: spriteSheetFrameTypes.TUNDRA,
    },
    [areaTypes.HILLS]: {
        [biomTypes.FLATLAND]: spriteSheetFrameTypes.HILLS_FLATLAND,
        [biomTypes.GRASSLAND]: spriteSheetFrameTypes.HILLS_GRASSLAND,
        [biomTypes.DESERT]: spriteSheetFrameTypes.HILLS_DESERT,
        [biomTypes.TUNDRA]: spriteSheetFrameTypes.HILLS_TUNDRA,
    },
    [areaTypes.FOREST]: {
        [biomTypes.GRASSLAND]: spriteSheetFrameTypes.FOREST_GRASSLAND,
        [biomTypes.FLATLAND]: spriteSheetFrameTypes.FOREST_FLATLAND,
        [biomTypes.TUNDRA]: spriteSheetFrameTypes.FOREST_TUNDRA,
    },
    [areaTypes.JUNGLE]: {
        [biomTypes.GRASSLAND]: spriteSheetFrameTypes.JUNGLE_GRASSLAND,
        [biomTypes.FLATLAND]: spriteSheetFrameTypes.JUNGLE_FLATLAND,
    },
};

export class SpriteCreator {
    constructor(textureNames, tileDimensions) {
        this._textureNames = textureNames;
        this._tileDimensions = tileDimensions;
    }

    mapFromMapTile(mapTile, mapBiomsSpriteSheet) {
        const textureName = this._getTextureName(this._textureNames, mapTile);
        const tile = new Sprite(mapBiomsSpriteSheet.textures[textureName]);

        const row = mapTile.j;
        const col = mapTile.i;
        const rowParity = row & 1;
        tile.x = col * this._tileDimensions.width + this._tileDimensions.widthOffset[rowParity];
        tile.y = row * this._tileDimensions.height * 0.75;

        return tile;
    }

    _getTextureName = (frameNames, mapTile) => {
        if (mapTile.tileType === tileTypes.LAND && mapTile.biomType !== biomTypes.NONE) {
            const frameType = areaTypeToSpriteSheetFrameType[mapTile.areaType][mapTile.biomType];
            return frameNames[frameType];
        }

        return frameNames[spriteSheetFrameTypes.WATER];
    }
}
