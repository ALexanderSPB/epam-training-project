export const fillArray = (array) => {
    const length = array.length;
    const fullArray = new Array(length);

    for (let i = 0; i < length; i++) {
        const current = array[i];
        fullArray[i] = current === undefined ? null : current;
    }

    return fullArray;
};
