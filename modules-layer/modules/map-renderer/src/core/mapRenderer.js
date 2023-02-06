import { Application, Container, Sprite, BaseTexture, Spritesheet } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { oddTileOffsetPercent, spriteSheetFrameTypes } from "../models.js";
import { tileTypes } from "../../../models/map.mjs";
import { ElementResizeObserver } from "../utils/elementResizeObserver.js";

export class MapRenderer {
    _config;
    _pixiApp;
    _appContainerResizeObserver;
    _viewport;
    _mapContainer;
    _tileDimensions;
    _spriteSheet;
    _spriteSheetLoadPromise;

    constructor(config) {
        this._config = { ...config };

        const appHtmlContainer = document.getElementById(this._config.app.containerId);
        this._appContainerResizeObserver = new ElementResizeObserver(appHtmlContainer);
        this._initPixiApp(appHtmlContainer);
        this._initViewport();
        this._calculateTileDimensions();
        this._loadSpriteSheet();
    }

    _initPixiApp(appHtmlContainer) {
        this._pixiApp = new Application({
            background: "#000",
            resizeTo: appHtmlContainer,
        });
        appHtmlContainer.appendChild(this._pixiApp.view);
    }

    _initViewport() {
        const app = this._pixiApp;

        this._viewport = new Viewport({
            passiveWheel: false,
            interaction: app.renderer.plugins.interaction,
        });

        app.stage.addChild(this._viewport);

        this._viewport
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

        this._appContainerResizeObserver.subscribe({
            update: ({ width, height }) => {
                this._viewport.resize(width, height);
            }
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

        const { textureNames } = this._config.spriteSheet;
        const tileDimensions = this._tileDimensions;
        const { matrix } = mapToRender;

        this._mapContainer = new Container();

        for (const tilesRow of matrix) {
            for (const mapTile of tilesRow) {
                const row = mapTile.j;
                const col = mapTile.i;
                const rowParity = row & 1;

                const textureName = this._getTextureName(textureNames, mapTile);
                const tile = new Sprite(this._spriteSheet.textures[textureName]);
                tile.x = col * tileDimensions.width + tileDimensions.widthOffset[rowParity];
                tile.y = row * tileDimensions.height * 0.75;

                this._mapContainer.addChild(tile);
            }
        }

        const renderMapSizes = { width: this._mapContainer.width, height: this._mapContainer.height };
        this._resizeViewportToMapSizes(renderMapSizes);
        this._viewport.moveCenter(renderMapSizes.width / 2, renderMapSizes.height / 2);

        this._viewport.addChild(this._mapContainer);
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
        const appWidth = this._appContainerResizeObserver.width;
        const appHeight = this._appContainerResizeObserver.height;
        this._viewport.resize(appWidth, appHeight, mapSizes.width, mapSizes.height);
    }

    clean() {
        if (this._mapContainer) {
            this._mapContainer.destroy({
                children: true,
            });
        }
    }
}
