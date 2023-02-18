import Konva from "konva";
import { config } from "../config.js";

const TILE_WIDTH = 10;
const TILE_HEIGHT = 10;

const stage = new Konva.Stage({
    container: "container",
    width: 800,
    height: 800,
});

const layer = new Konva.Layer();

const map = [...Array(config.SIDE_LENGTH)].map((_, row) => [...Array(config.SIDE_LENGTH)].map((_, col) => {
    const tile = new Konva.Rect({
        x: col * TILE_WIDTH,
        y: row * TILE_HEIGHT,
        width: TILE_WIDTH,
        height: TILE_HEIGHT,
        fill: "rgb(0,0,0)"
    })

    layer.add(tile);
    return tile;
}));

stage.add(layer);

export const renderMap = (matrix, estimateColorOfNoiseValue) => {
    let color = "";
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            color = estimateColorOfNoiseValue(matrix[row][col]);
            map[row][col].fill(color);
        }
    }
};
