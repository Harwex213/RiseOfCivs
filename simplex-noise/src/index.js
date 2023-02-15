import {createSimplexNoise} from "./noise.js";
// import { createChart } from "./chart.js";
import {renderMap} from "./map.js";

const SIDE_LENGTH = 100;

const normalizedNoise2D = (noise2D) => (x, y) => noise2D(x, y) / 2 + 0.5;

const strategies = {
    simple: ({ noise2D, entries }) => {
        const [x, y] = entries;
        return noise2D(x, y);
    },
    frequency: (frequency) => ({ noise2D, entries }) => {
        const [x, y] = entries;
        return noise2D(frequency * x, frequency * y);
    },
    normalized: ({ noise2D, entries }) => {
        const [x, y] = entries;
        return noise2D(x, y) / 2 + 0.5;
    },
    normalizedAndFrequency: (frequency) => ({ noise2D, entries }) => {
        const [x, y] = entries;
        return noise2D(frequency * x, frequency * y) / 2 + 0.5;
    },
    weightedSum: ({ noise2D, noise2D_2, noise2D_3, entries }) => {
        const [x, y] = entries;
        const lowFrequency = normalizedNoise2D(noise2D);
        const middleFrequency = normalizedNoise2D(noise2D_2);
        const highFrequency = normalizedNoise2D(noise2D_2);

        let noiseValue = (
            lowFrequency(0.075 * x, 0.075 * y)
            + 0.5 * middleFrequency(8 * x, 8 * y)
            // + 0.15 * highFrequency(4 * x, 4 * y)
        );
        
        noiseValue /= 1.45;
        // noiseValue /= 1.75;
        
        return noiseValue;
    },
};

// const matrix = createSimplexNoise(SIDE_LENGTH, strategies.frequency(0.1));
// const matrix = createSimplexNoise(SIDE_LENGTH, strategies.normalized);
// const matrix = createSimplexNoise(SIDE_LENGTH, strategies.normalizedAndFrequency(8));
const matrix = createSimplexNoise(SIDE_LENGTH, strategies.weightedSum);

renderMap(matrix);

// const datasets = [
//     {
//         label: "simple noise",
//         values: createSimplexNoise(SIDE_LENGTH, strategies.simple),
//         color: "rgba(55,255,0,1)"
//     },
//     {
//         label: "frequency noise",
//         values: createSimplexNoise(SIDE_LENGTH, strategies.frequency(7)),
//         color: "rgba(255,0,221, 0.5)"
//     },
// ]
// createChart(datasets);

const HILLS_RATIO = 0.6;
const MOUNTAIN_RATIO = 0.8;
const validateHills = (matrix) => {
    const data = matrix.reduce((prev, next) => prev.concat(next));
    
    const hills = data.filter(value => value >= HILLS_RATIO).length;
    const mountains = data.filter(value => value >= MOUNTAIN_RATIO).length;

    return [hills, mountains];
};

const validation = validateHills(matrix);
console.log(`Hills = ${validation[0]}. Mountains = ${validation[1]}.`)
