import axios from 'axios';

const getters = {
  detail: state => state.detail,
  loading: state => state.loading,
  loaded: state => state.loaded,
};

const actions = {
  getDetail: ({ commit }, id) => {
    commit('SET_LOADING', true);
    axios.get(`${process.env.VUE_APP_API}/discovery/v2/events/${id}.json?apikey=${process.env.VUE_APP_APIKEY}`)
      .then((response) => {
        commit('SET_DETAIL', response.data);
        commit('SET_LOADING', false);
        commit('SET_LOADED', true);
      })
      .catch(() => {
        commit('SET_LOADING', false);
        commit('SET_LOADED', false);
      });
  },
};

const mutations = {
  SET_DETAIL(state, detail) {
    const $state = state;
    $state.detail = detail;
  },
  SET_LOADED(state, status) {
    const $state = state;
    $state.loaded = status;
  },
  SET_LOADING(state, status) {
    const $state = state;
    $state.loading = status;
  },
};

const state = {
  detail: null,
  loading: false,
  loaded: false,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
