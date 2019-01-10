import Vue from 'vue'
import Vuex from 'vuex'
import {createField} from '@/creator/Field'

Vue.use(Vuex)

export default new Vuex.Store({
    // strict: true,
    state: {
        config: {
            colors: ['#FFF', '#FF0', '#0F0'],
            field: {
                width: 7,
                height: 7,
            }
        },
        currentPlayer: 1,
        playField: createField()
    },
    mutations: {
        changePlayer: (state) => {
            if(state.currentPlayer === 1) state.currentPlayer = 2;
            else state.currentPlayer = 1;
        },
        changeFieldValue: (state, width, height, player) => {
            const newField = [...state.playField];
            console.log(newField[height])
            state.playField= newField[height][width].player = player;
        }
    },
    actions: {  },
    getters: {
        getPlayerColor: (state) => (playerNumber) => state.config.colors[playerNumber],
    }
})
