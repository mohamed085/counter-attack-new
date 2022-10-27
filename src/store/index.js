import Vue from 'vue';
import Vuex from 'vuex';

import authModule from './modules/auth/index';
import MainModule from "./modules/main/index";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main: MainModule,
    auth: authModule
  }
})
