export const normalizedNoise2D = (noise2D) => (x, y) => noise2D(x, y) / 2 + 0.5;

export const replaceGuis = (guiManager, oldGuis, newGuis) => {
    guiManager.removeRangeGui(oldGuis.map((gui) => gui.id));
    for (const newGui of newGuis) {
        guiManager.addGui(newGui);
    }
}

export const persistConfig = (config, key) => {
    localStorage.setItem(key, JSON.stringify(config));
}

export const getPersistedConfig = (key) => {
    return JSON.parse(localStorage.getItem(key));
}
