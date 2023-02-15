import seedrandom from "seedrandom";
import { createNoise2D } from "simplex-noise";

const SEED = "olegrechik";
const noise2D = createNoise2D(seedrandom(SEED));
const noise2D_2 = createNoise2D(seedrandom(SEED + "_hello-world-here"));
const noise2D_3 = createNoise2D(seedrandom(SEED + "_hot-and-cold"));

export const createSimplexNoise = (sideLength, strategy) => {
    const noise = [...Array(sideLength)].map(() => [...Array(sideLength)].map(() => 0));
    
    let maximum = 0;
    let minimum = 0;
    
    for (let x = 0; x < noise.length; x++) {
        for (let y = 0; y < noise[x].length; y++) {
            noise[x][y] = strategy({
                noise2D,
                noise2D_2,
                noise2D_3,
                entries: [x, y]
            });
            
            if (noise[x][y] > maximum) {
                maximum = noise[x][y];
            }
            if (noise[x][y] < minimum) {
                minimum = noise[x][y];
            }
        }
    }

    console.log(`Noise generated. Max value: ${maximum}. Min value: ${minimum}`)
    
    return noise;
}
