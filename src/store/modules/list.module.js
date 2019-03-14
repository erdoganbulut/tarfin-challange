import axios from 'axios';

const getters = {
  list: state => state.list,
  links: state => state.links,
  page: state => state.page,
  loading: state => state.loading,
  loaded: state => state.loaded,
};

const actions = {
  getList: ({ commit, state }, params) => {
    commit('SET_LOADING', true);
    const keyword = params.keyword ? params.keyword : '';
    const url = params.type ? state.links[params.type].href : `/discovery/v2/events.json?keyword=${keyword}&size=5`;
    const goto = params.goto ? `&page=${params.goto.number}` : '';
    axios.get(`${process.env.VUE_APP_API}${url}${goto}&apikey=${process.env.VUE_APP_APIKEY}`)
      .then((response) => {
        // eslint-disable-next-line dot-notation
        if (response.data['_embedded']) commit('SET_LIST', response.data['_embedded'].events);
        else commit('SET_LIST', null);
        // eslint-disable-next-line dot-notation
        commit('SET_LINKS', response.data['_links']);
        commit('SET_PAGE', response.data.page);
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
  SET_LIST(state, list) {
    const $state = state;
    $state.list = list;
  },
  SET_LINKS(state, links) {
    const $state = state;
    $state.links = links;
  },
  SET_PAGE(state, page) {
    const $state = state;
    $state.page = page;
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
  list: null,
  links: null,
  page: null,
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
