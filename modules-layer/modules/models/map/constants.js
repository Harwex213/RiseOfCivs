import { directionsTypes } from "./enums.js";

export const ODDR_DIRECTION_DIFFERENCES = [
    {
        [directionsTypes.LEFT_DOWN]: [+1, -1],
        [directionsTypes.RIGHT_DOWN]: [+1, 0],
        [directionsTypes.RIGHT]: [0, +1],
        [directionsTypes.RIGHT_UP]: [-1, 0],
        [directionsTypes.LEFT_UP]: [-1, -1],
        [directionsTypes.LEFT]: [0, -1],
    },
    {
        [directionsTypes.LEFT_DOWN]: [+1, 0],
        [directionsTypes.RIGHT_DOWN]: [+1, +1],
        [directionsTypes.RIGHT]: [0, +1],
        [directionsTypes.RIGHT_UP]: [-1, +1],
        [directionsTypes.LEFT_UP]: [-1, 0],
        [directionsTypes.LEFT]: [0, -1],
    },
];
