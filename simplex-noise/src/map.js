import Konva from "konva";

const TILE_WIDTH = 10;
const TILE_HEIGHT = 10;

const stage = new Konva.Stage({
    container: "map",
    width: 800,
    height: 800,
});

const estimateColorOfNoiseValue = (value) => {
    if (value > 0.8) {
        return "rgba(0,0,0,1)"
    }
    if (value > 0.6) {
        return "rgba(0,0,0,0.5)"
    }

    return "rgba(0,0,0,0.05)";
}

export const renderMap = (matrix) => {
    const layer = new Konva.Layer();
    
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const tile = new Konva.Rect({
                x: col * TILE_WIDTH,
                y: row * TILE_HEIGHT,
                width: TILE_WIDTH,
                height: TILE_HEIGHT,
                fill: estimateColorOfNoiseValue(matrix[row][col])
            })
            
            layer.add(tile);
        }
    }
    
    stage.add(layer);
};
