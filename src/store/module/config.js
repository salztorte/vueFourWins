export default {
    namespaced: true,
    state: {
        colors: ['#FFF', '#FF0', '#0F0'],
        fieldWidth: 7,
        fieldHeight: 7,
        winCombo: 4,
    },
    mutations: {},
    actions: {},
    getters: {
        getFieldHeight: (state) => state.fieldHeight,
        getFieldWidth: (state) => state.fieldWidth,
        getPlayerColor: (state) => (playerNumber) => state.colors[playerNumber],
    }
};
