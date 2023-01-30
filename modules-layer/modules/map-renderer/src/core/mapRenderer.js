import { Application, Assets, Container, Sprite } from "pixi.js";
import { oddTileOffsetPercent, spriteSheetFrameTypes } from "../models.js";
import { tileTypes } from "../../../models/map.mjs";

export class MapRenderer {
    _config;
    _pixiApp;
    _spriteSheetLoadPromise;
    _tileDimensions;

    constructor(config) {
        this._config = {
            tileSize: config.tileSize,
            pixiApp: {
                containerId: config.appContainerId,
                dimensions: { ...config.appDimensions }
            },
            spriteSheet: {
                path: config.spriteSheetPath,
                frameNames: { ...config.spriteSheetFrameNames }
            },
        };

        this._initPixiApp();
        this._calculateTileDimensions();
        this._loadSpriteSheet();
    }

    _initPixiApp() {
        const { dimensions, containerId } = this._config.pixiApp;

        this._pixiApp = new Application({ background: "#000", ...dimensions });
        document.getElementById(containerId).appendChild(this._pixiApp.view);
    }

    _calculateTileDimensions() {
        const { tileSize } = this._config;

        const tileWidth = tileSize / 2 * Math.sqrt(3.7);
        this._tileDimensions = {
            width: tileWidth,
            height: tileSize,
            widthOffset: [0, tileWidth * oddTileOffsetPercent],
        };
    }

    _loadSpriteSheet() {
        const { path } = this._config.spriteSheet;

        this._spriteSheetLoadPromise = Assets.load(path);
    }

    async render(mapToRender) {
        const { frameNames } = this._config.spriteSheet;
        const tileDimensions = this._tileDimensions;

        const mapContainer = new Container();
        this._pixiApp.stage.addChild(mapContainer);

        const { matrix } = mapToRender;
        const spriteSheet = await this._spriteSheetLoadPromise;

        for (const tilesRow of matrix) {
            for (const mapTile of tilesRow) {
                const row = mapTile.i;
                const col = mapTile.j;
                const rowParity = row & 1;

                const frameType = this._getFrameType(frameNames, mapTile);
                const tile = new Sprite(spriteSheet.textures[frameType]);
                tile.x = col * tileDimensions.width + tileDimensions.widthOffset[rowParity];
                tile.y = row * tileDimensions.height * 3 / 4;

                mapContainer.addChild(tile);
            }
        }
    }

    _getFrameType = (frameNames, mapTile) => {
        if (mapTile.tileType === tileTypes.SEA || mapTile.tileType === tileTypes.LAKE) {
            return frameNames[spriteSheetFrameTypes.water];
        }
        if (mapTile.tileType === tileTypes.LAND) {
            return frameNames[spriteSheetFrameTypes.desert];
        }
        return frameNames[spriteSheetFrameTypes.water];
    }
}
