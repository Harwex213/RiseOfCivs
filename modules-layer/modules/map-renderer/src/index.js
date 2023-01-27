import Konva from "konva";
import { tileTypes } from "../../models/map.mjs";

const tileTypeToColor = (number) => {
    if (number === -1) {
        return "#c22626";
    }
    if (number === -2) {
        return "#131de0";
    }
    if (number === -3) {
        return "#4eb049";
    }
    if (number === -4) {
        return "#c9bd10";
    }

    if (number === tileTypes.LAND) {
        return "#494949";
    }
}

const renderMap = (map, config) => {
    const { width: mapWidth, height: mapHeight,  } = map;
    const { tileSize, canvasContainer, canvasRes } = config;

    const stage = new Konva.Stage({
        container: canvasContainer,
        width: canvasRes.width,
        height: canvasRes.height
    });
    const layer = new Konva.Layer();

    const background = new Konva.Rect({
        x: 0,
        y: 0,
        width: mapWidth * tileSize,
        height: mapHeight * tileSize,
        fill: "#000",
    });
    layer.add(background);

    for (const land of map.lands) {
        const renderTile = new Konva.Rect({
            x: land.i * tileSize,
            y: land.j * tileSize,
            width: tileSize,
            height: tileSize,
            fill: tileTypeToColor(land.tileType),
        });

        layer.add(renderTile);
    }

    stage.add(layer);
    stage.draw();
};

export default renderMap;
