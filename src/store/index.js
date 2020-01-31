import Vue from 'vue'
import Vuex from 'vuex'
import Config from './module/config';

Vue.use(Vuex);

const localStorePlugin = store =>  {
    store.subscribe((mutation, state) => {
        localStorage.setItem("config", JSON.stringify(state));
    })
};


export default new Vuex.Store({
    state: {
        currentPlayerIndex: 1,
    },
    modules :{
        config: Config,
    },
    mutations: {
        initialiseStore(/*state*/){
          /*const storeValue = localStorage.getItem("config");
          if(!storeValue) return;

            this.replaceState(
              Object.assign(state, JSON.parse(storeValue))
            )
*/
        },
        changePlayer: (state) => {
            state.currentPlayerIndex = (state.currentPlayerIndex % (state.config.player.length - 1)) + 1
        },
    },
    actions: {  },
    plugins :[localStorePlugin],
    getters: {
        currentPlayer: state => {
            return state.config.player[state.currentPlayerIndex]
        },
    }
})



