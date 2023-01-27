import { tileTypes, SINGLE_VECTORS, Map } from "../../models/map.mjs";
import Randomizer from "./randomizer.js";

export default class MapGenerator {
    constructor(config) {
        this._config = {
            mapSizes: { width: config.mapSizes.width, height: config.mapSizes.height },
            regionSize: config.regionSize,
            playersAmount: config.playersAmount,
            waterBalanceValue: config.waterBalanceValue,
            maxDistanceBetweenPlayers: config.maxDistanceBetweenPlayers,
            seaLandBoundary: config.seaLandBoundary,
        };
        this._calculateParams();
    }

    _calculateParams() {
        const { regionSize, mapSizes, waterBalanceValue } = this._config;

        const totalHexesAmount = mapSizes.width * mapSizes.height;
        const landHexesAmount = totalHexesAmount - (totalHexesAmount * waterBalanceValue);
        const regionsAmount = Math.trunc(landHexesAmount / regionSize);
        
        this._params = {
            targetMass: regionsAmount * regionSize,
            centerPoint: [mapSizes.width / 2 - 1, mapSizes.height / 2 - 1],
        };
    }

    generateMap(randomSeed) {
        const { mapSizes, maxDistanceBetweenPlayers, playersAmount, seaLandBoundary } = this._config;
        const { centerPoint, targetMass } = this._params;
        const randomizer = new Randomizer(randomSeed);

        const map = new Map(mapSizes.width, mapSizes.height);
        const coasts = [centerPoint];

        const tileTypeCoast = (point) => {
            if (point[0] !== seaLandBoundary && map.matrix[point[0] - 1][point[1]].tileType === tileTypes.SEA) {
                coasts.push([point[0] - 1, point[1]]);
                map.matrix[point[0] - 1][point[1]].tileType = tileTypes.COAST;
            }
            if (point[0] + seaLandBoundary + 1 !== mapSizes.width && map.matrix[point[0] + 1][point[1]].tileType === tileTypes.SEA) {
                coasts.push([point[0] + 1, point[1]]);
                map.matrix[point[0] + 1][point[1]].tileType = tileTypes.COAST;
            }
            if (point[1] !== seaLandBoundary && map.matrix[point[0]][point[1] - 1].tileType === tileTypes.SEA) {
                coasts.push([point[0], point[1] - 1]);
                map.matrix[point[0]][point[1] - 1].tileType = tileTypes.COAST;
            }
            if (point[1] + seaLandBoundary + 1 !== mapSizes.height && map.matrix[point[0]][point[1] + 1].tileType === tileTypes.SEA) {
                coasts.push([point[0], point[1] + 1]);
                map.matrix[point[0]][point[1] + 1].tileType = tileTypes.COAST;
            }
        }
        const checkingDirections = (point, possibleDirections) => {
            if (point[0] !== 0 && map.matrix[point[0]][point[1] + SINGLE_VECTORS.UP[1]].tileType === tileTypes.COAST) {
                possibleDirections.push(SINGLE_VECTORS.UP);
            }
            if (point[1] + 1 !== mapSizes.height && map.matrix[point[0]][point[1] + SINGLE_VECTORS.DOWN[1]].tileType === tileTypes.COAST) {
                possibleDirections.push(SINGLE_VECTORS.DOWN);
            }
            if (point[0] !== 0 && map.matrix[point[0] + SINGLE_VECTORS.LEFT[0]][point[1]].tileType === tileTypes.COAST) {
                possibleDirections.push(SINGLE_VECTORS.LEFT);
            }
            if (point[0] + 1 !== mapSizes.width && map.matrix[point[0] + SINGLE_VECTORS.RIGHT[0]][point[1]].tileType === tileTypes.COAST) {
                possibleDirections.push(SINGLE_VECTORS.RIGHT);
            }
        }

        for (let i = 0; i < targetMass; i++) {
            const possibleDirections = [];
            checkingDirections(centerPoint, possibleDirections);
            const chosenDirection = possibleDirections[randomizer.getRandom(possibleDirections.length)]

            if (typeof chosenDirection === 'undefined') {
                const coastIndex = randomizer.getRandom(coasts.length);
                centerPoint[0] = coasts[coastIndex][0];
                centerPoint[1] = coasts[coastIndex][1];
                coasts.splice(coastIndex, 1);
            } else {
                centerPoint[0] += chosenDirection[0];
                centerPoint[1] += chosenDirection[1];
                coasts.splice(coasts.indexOf([centerPoint[0], centerPoint[1]]), 1);
            }

            map.matrix[centerPoint[0]][centerPoint[1]].tileType = tileTypes.LAND;
            map.lands.push(map.matrix[centerPoint[0]][centerPoint[1]]);
            tileTypeCoast(centerPoint);
        }

        for (const coast of coasts) {
            map.matrix[coast[0]][coast[1]].tileType = tileTypes.LAND;
            map.lands.push(map.matrix[coast[0]][coast[1]]);
        }

        const setPlayerLand = (point, movement, color) => {
            map.matrix[point[0] + movement[0]][point[1] + movement[1]].tileType = color;
            map.lands.push(map.matrix[point[0] + movement[0]][point[1] + movement[1]]);
        }
        let coastsCopy = [...coasts];
        for (let playerColor = -1; playerColor >= -playersAmount; playerColor--) {
            const playerIndex = randomizer.getRandom(coastsCopy.length);
            const playerLand = coastsCopy[playerIndex];
            map.matrix[playerLand[0]][playerLand[1]].tileType = playerColor;
            map.lands.push(map.matrix[playerLand[0]][playerLand[1]]);

            coastsCopy.splice(playerIndex, 1);
            coastsCopy = coastsCopy.filter(coast =>
                (coast[0] > playerLand[0] + maxDistanceBetweenPlayers || coast[1] > playerLand[1] + maxDistanceBetweenPlayers) ||
                (coast[0] < playerLand[0] - maxDistanceBetweenPlayers || coast[1] < playerLand[1] - maxDistanceBetweenPlayers));

            setPlayerLand(playerLand, SINGLE_VECTORS.UP, playerColor);
            setPlayerLand(playerLand, SINGLE_VECTORS.DOWN, playerColor);
            setPlayerLand(playerLand, SINGLE_VECTORS.LEFT, playerColor);
            setPlayerLand(playerLand, SINGLE_VECTORS.RIGHT, playerColor);
            setPlayerLand(playerLand, SINGLE_VECTORS.LEFT_UP, playerColor);
            setPlayerLand(playerLand, SINGLE_VECTORS.RIGHT_UP, playerColor);
            setPlayerLand(playerLand, SINGLE_VECTORS.LEFT_DOWN, playerColor);
            setPlayerLand(playerLand, SINGLE_VECTORS.RIGHT_DOWN, playerColor);
        }

        return map;
    }
}
