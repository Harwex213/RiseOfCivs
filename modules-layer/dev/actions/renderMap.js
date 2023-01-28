import renderMap, { MapRenderConfig } from "map-renderer";

const mapRenderConfig = new MapRenderConfig();
mapRenderConfig.tileSize = 16;
mapRenderConfig.canvasContainer = "container";
mapRenderConfig.canvasRes = { width: 1920, height: 1080 };

export const renderMapAction = (map) => renderMap(map, mapRenderConfig);
