<template lang="pug">
  .home
    Search

    table.table(v-if="loaded")
      thead.thead-dark
        tr
          th(scope="col") #
          th(scope="col") thumb
          th(scope="col") Name
          th(scope="col") Date
          th(scope="col") status
          th(scope="col")
      tbody(v-if="!loading")
        tr(v-for="(item, i) in list")
          th(scope="row") {{ page.number * 5 + i + 1 }}
          td
            img(:src="getThumbnail(item.images).url")
          td {{ item.name }}
          td(v-if="item.dates.start.localDate")
            span {{ item.dates.start.localDate }}
            span(v-if="item.dates.start.localDate")  {{ item.dates.start.localTime }}
            span(v-if="item.dates.end")
              span(v-if="item.dates.end.localDate")  - {{ item.dates.end.localDate }}
              span(v-if="item.dates.end.localTime")  {{ item.dates.end.localTime }}
            span(v-if="item.dates.timezone")
              br
              |  ({{ item.dates.timezone }})
          td {{ item.dates.status.code }}
          td
            router-link(:to="'/detail/' + item.id")
              img(src="../assets/loupe.svg" width="18")

    Loading(v-if="loading")
    Pagination(v-if="loaded")
    Error(v-if="!loading && !loaded")
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
import Pagination from '../components/Pagination.vue';
import Search from '../components/Search.vue';
import Loading from '../components/Loading.vue';
import Error from '../components/Error.vue';

export default {
  name: 'home',
  computed: {
    ...mapGetters({
      list: 'list/list',
      page: 'list/page',
      loading: 'list/loading',
      loaded: 'list/loaded',
    }),
  },
  methods: {
    ...mapActions({
      getList: 'list/getList',
    }),
    getThumbnail(images) {
      return _.minBy(images, 'width');
    },
  },
  mounted() {
    this.getList({});
  },
  components: {
    Pagination,
    Search,
    Loading,
    Error,
  },
};
</script>
