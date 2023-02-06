import { Application, Container, BaseTexture, Spritesheet } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { oddTileOffsetPercent } from "../constants.js";
import { ElementResizeObserver } from "../utils/elementResizeObserver.js";
import { SpriteCreator } from "./spriteCreator.js";

export class MapRenderer {
    _config;
    _pixiApp;
    _appContainerResizeObserver;
    _viewport;
    _mapContainer;
    _tileDimensions;
    _spriteSheet;
    _spriteSheetLoadPromise;
    _spriteCreator;

    constructor(config) {
        this._config = { ...config };

        const appHtmlContainer = document.getElementById(this._config.app.containerId);
        this._appContainerResizeObserver = new ElementResizeObserver(appHtmlContainer);
        this._initPixiApp(appHtmlContainer);
        this._initViewport();
        this._calculateTileDimensions();
        this._loadSpriteSheet();
        this._initSpriteCreator();
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

    _initSpriteCreator() {
        this._spriteCreator = new SpriteCreator(this._config.spriteSheet.textureNames, this._tileDimensions);
    }

    async render(mapToRender) {
        this.clean();

        await this._spriteSheetLoadPromise;

        this._mapContainer = new Container();
        const { matrix } = mapToRender;

        for (const tilesRow of matrix) {
            for (const mapTile of tilesRow) {
                const tile = this._spriteCreator.mapFromMapTile(mapTile, this._spriteSheet);
                this._mapContainer.addChild(tile);
            }
        }

        const renderMapSizes = { width: this._mapContainer.width, height: this._mapContainer.height };
        this._resizeViewportToMapSizes(renderMapSizes);
        this._viewport.moveCenter(renderMapSizes.width / 2, renderMapSizes.height / 2);

        this._viewport.addChild(this._mapContainer);
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
