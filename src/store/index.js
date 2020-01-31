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
        currentPlayer: 1,
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
            if(state.currentPlayer === 1) state.currentPlayer = 2;
            else state.currentPlayer = 1;
        },
    },
    actions: {  },
    plugins :[localStorePlugin]
})



