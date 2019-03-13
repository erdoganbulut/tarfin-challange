import axios from 'axios';

const getters = {
  list: state => state.list,
  links: state => state.links,
  page: state => state.page,
};

const actions = {
  getList: ({ commit }) => {
    axios.get('https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=Kz1dCRkMXYWb9EyTygg6oJtbcgmRv0dz')
      .then((response) => {
        commit('SET_LIST', response.data['_embedded'].events);
        commit('SET_LINKS', response.data['_links']);
        commit('SET_PAGE', response.data.page);
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
};

const state = {
  list: null,
  links: null,
  page: null,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
