export default {
    namespaced: true,
    state: {
        colors: ['#FFF', '#FF0', '#0F0'],
        fieldWidth: 7,
        fieldHeight: 7,
        winCombo: 5,
    },
    mutations: {
        updateFieldHeight: (state, height) => state.fieldHeight = height,
        updateFieldWidth: (state, width) => state.fieldWidth = width,
        updateWinCombo: (state, combo) => state.winCombo = combo,
        updateColor: (state, {index, color}) => state.colors[index] = color,
    },
    actions: {},
    getters: {
        fieldHeight: state => state.fieldHeight,
        fieldWidth: state => state.fieldWidth,
        playerColor: state => (playerNumber) => state.colors[playerNumber],
        winCombo: state => state.winCombo,
    }
};
