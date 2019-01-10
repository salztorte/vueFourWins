import Vue from 'vue'
import Vuex from 'vuex'
import Config from './module/config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPlayer: 1,
    },
    modules :{
        config: Config,
    },
    mutations: {
        changePlayer: (state) => {
            if(state.currentPlayer === 1) state.currentPlayer = 2;
            else state.currentPlayer = 1;
        },
    },
    actions: {  },
    getters: {
        getPlayerColor: (state) => (playerNumber) => state.config.colors[playerNumber],
    }
})
