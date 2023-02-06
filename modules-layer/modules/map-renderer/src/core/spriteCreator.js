import { Sprite } from "pixi.js";
import { areaTypes, biomTypes, tileTypes } from "../../../models/map.mjs";
import { spriteSheetFrameTypes } from "../constants.js";

const areaTypeToSpriteSheetFrameType = {
    [areaTypes.NONE]: {
        [biomTypes.DESERT]: spriteSheetFrameTypes.desert,
        [biomTypes.FLATLAND]: spriteSheetFrameTypes.plainland,
        [biomTypes.GRASSLAND]: spriteSheetFrameTypes.grassland,
        [biomTypes.MOUNTAIN]: spriteSheetFrameTypes.mountain,
        [biomTypes.TUNDRA]: spriteSheetFrameTypes.tundra,
    },
    [areaTypes.HILLS]: {
        [biomTypes.FLATLAND]: spriteSheetFrameTypes.hillsPlainland,
        [biomTypes.GRASSLAND]: spriteSheetFrameTypes.hillsGrassland,
        [biomTypes.DESERT]: spriteSheetFrameTypes.hillsDesert,
        [biomTypes.TUNDRA]: spriteSheetFrameTypes.hillsTundra,
    },
    [areaTypes.FOREST]: {
        [biomTypes.GRASSLAND]: spriteSheetFrameTypes.forestGrassland,
        [biomTypes.FLATLAND]: spriteSheetFrameTypes.forestPlainland,
        [biomTypes.TUNDRA]: spriteSheetFrameTypes.forestTundra,
    },
    [areaTypes.JUNGLE]: {
        [biomTypes.GRASSLAND]: spriteSheetFrameTypes.jungleGrassland,
        [biomTypes.FLATLAND]: spriteSheetFrameTypes.junglePlainland,
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

        return frameNames[spriteSheetFrameTypes.water];
    }
}
