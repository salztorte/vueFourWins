import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify,

  beforeCreate() {
    this.$store.commit("initialiseStore")
  }
}).$mount('#app')
