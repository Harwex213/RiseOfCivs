export const waitSingleExec = (fn) => {
    let debounceFlag = false;

    return async () => {
        if (debounceFlag) {
            return;
        }
        debounceFlag = true;
        await fn();
        debounceFlag = false;
    }
};
