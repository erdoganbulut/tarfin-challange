<template lang="pug">
  .detail

    Loading(v-if="loading")
    Error(v-if="!loading && !loaded")

    .detail--content(v-if="loaded && !loading")
      .card
        img.card-img-top(:src="photo")
        .card-body
          h3.card-title {{ detail.name }}
          p.card-subtitle.mb-2.text-muted {{ detail.type }}
          p.card-text(v-if="detail.info") {{ detail.info }}
          p.card-text(v-if="detail.pleaseNote") {{ detail.pleaseNote }}
        ul.list-group.list-group-flush
          li.list-group-item(v-if="detail.dates.start.localDate")
            span {{ detail.dates.start.localDate }}
            span(v-if="detail.dates.start.localDate")  {{ detail.dates.start.localTime }}
            span(v-if="detail.dates.end")
              span(v-if="detail.dates.end.localDate")  - {{ detail.dates.end.localDate }}
              span(v-if="detail.dates.end.localTime")  {{ detail.dates.end.localTime }}
            span(v-if="detail.dates.timezone")
              |  ({{ detail.dates.timezone }})
          li.list-group-item(v-if="detail.dates.status.code")
            span {{ detail.dates.status.code }}
          li.list-group-item(v-if="detail.locale")
            span {{ detail.locale }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import Loading from '../components/Loading.vue';
import Error from '../components/Error.vue';

export default {
  name: 'detail',
  computed: {
    ...mapGetters({
      detail: 'detail/detail',
      loading: 'detail/loading',
      loaded: 'detail/loaded',
    }),
    photo() {
      return this.detail ? _.maxBy(this.detail.images, 'width').url : '';
    },
  },
  methods: {
    ...mapActions({
      getDetail: 'detail/getDetail',
    }),
    handleMountedWorks() {
      this.getDetail(this.$route.params.id);
    },
  },
  mounted() {
    this.handleMountedWorks();
  },
  watch: {
    $route: {
      // eslint-disable-next-line
      handler: function () {
        this.handleMountedWorks();
      },
      deep: true,
    },
  },
  components: {
    Loading,
    Error,
  },
};
</script>
