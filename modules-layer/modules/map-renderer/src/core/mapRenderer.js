import { Application, Container, Sprite, BaseTexture, Spritesheet } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { oddTileOffsetPercent, spriteSheetFrameTypes } from "../models.js";
import { tileTypes } from "../../../models/map.mjs";

export class MapRenderer {
    _config;
    _pixiApp;
    _viewport;
    _tileDimensions;
    _spriteSheet;
    _spriteSheetLoadPromise;

    constructor(config) {
        this._config = { ...config };

        this._initPixiApp();
        this._calculateTileDimensions();
        this._initViewport();
        this._loadSpriteSheet();
    }

    _initPixiApp() {
        const { dimensions, containerId } = this._config.app;

        this._pixiApp = new Application({ ...dimensions });
        document.getElementById(containerId).appendChild(this._pixiApp.view);
    }

    _initViewport() {
        const { dimensions: appDimensions } = this._config.app;
        const app = this._pixiApp;

        const viewport = new Viewport({
            screenWidth: appDimensions.width,
            screenHeight: appDimensions.height,
            passiveWheel: false,
            interaction: app.renderer.plugins.interaction,
        });

        app.stage.addChild(viewport);
        this._viewport = viewport;

        viewport
            .drag({
                wheel: false,
                mouseButtons: "left",
            })
            .pinch()
            .decelerate()
            .clamp({
                direction: "all",
                underflow: "center"
            });
    }

    _calculateTileDimensions() {
        const { tileSize } = this._config;

        this._tileDimensions = {
            width: tileSize,
            height: tileSize,
            widthOffset: [0, tileSize * oddTileOffsetPercent],
        };
    }

    _loadSpriteSheet() {
        const { atlasData } = this._config.spriteSheet;

        this._spriteSheet = new Spritesheet(
            BaseTexture.from(atlasData.meta.image),
            atlasData
        );
        this._spriteSheetLoadPromise = this._spriteSheet.parse();
    }

    async render(mapToRender) {
        await this._spriteSheetLoadPromise;

        this._resizeViewportToMapSizes({ width: mapToRender.width, height: mapToRender.height });

        const mapContainer = new Container();
        this._viewport.addChild(mapContainer);

        const { textureNames } = this._config.spriteSheet;
        const tileDimensions = this._tileDimensions;
        const { matrix } = mapToRender;

        console.log(tileDimensions);

        for (const tilesRow of matrix) {
            for (const mapTile of tilesRow) {
                const row = mapTile.i;
                const col = mapTile.j;
                const rowParity = row & 1;

                const textureName = this._getTextureName(textureNames, mapTile);
                const tile = new Sprite(this._spriteSheet.textures[textureName]);
                tile.x = col * tileDimensions.width + tileDimensions.widthOffset[rowParity];
                tile.y = row * tileDimensions.height * 3 / 4;

                mapContainer.addChild(tile);
            }
        }
    }

    _getTextureName = (frameNames, mapTile) => {
        if (mapTile.tileType === tileTypes.SEA || mapTile.tileType === tileTypes.LAKE) {
            return frameNames[spriteSheetFrameTypes.water];
        }
        if (mapTile.tileType === tileTypes.LAND) {
            return frameNames[spriteSheetFrameTypes.desert];
        }
        return frameNames[spriteSheetFrameTypes.water];
    }

    _resizeViewportToMapSizes(mapSizes) {
        const tileDimensions = this._tileDimensions;
        const appDimensions = this._config.app.dimensions;

        const mapWidth = mapSizes.height * tileDimensions.width + tileDimensions.widthOffset[1];
        const mapHeight = mapSizes.width * tileDimensions.height;
        this._viewport.resize(appDimensions.width, appDimensions.height, mapWidth, mapHeight);
        this._viewport.moveCenter(mapWidth / 2, mapHeight / 2);
    }
}
