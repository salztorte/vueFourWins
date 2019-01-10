export const createFieldItem = (width = 0, height = 0) => {
    return {
        width,
        height,
        player: 0,
    }
};

export const createField = (width = 7, height = 7) =>  {
    return new Array(height).fill().map((_, h) => new Array(width).fill().map((_, w) => createFieldItem(w, h)));
};
