import Vue from 'vue';
import Vuex from 'vuex';

import list from './modules/list.module';
import detail from './modules/detail.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    list,
    detail,
  },
});
