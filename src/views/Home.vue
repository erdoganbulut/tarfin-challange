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
          td Detay

    Pagination(v-if="loaded")
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
import Pagination from '../components/Pagination.vue';
import Search from '../components/Search.vue';

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
    this.getList();
  },
  components: {
    Pagination,
    Search,
  },
};
</script>
