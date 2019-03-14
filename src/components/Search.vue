<template lang="pug">
  section.component.is-search
    form.form-inline.justify-content-end(v-on:submit.prevent="handleForm")
      .form-group.mb-2
        label.sr-only(for="inputSearch") search keyword ex. football, cinema, etc...
        input.form-control(v-model="modelSearch" type="text" id="inputSearch" placeholder="search keyword ex. football, cinema, etc...")
      button.btn.btn-primary.mb-2(type="submit") Search
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'search',
  computed: {
    ...mapGetters({
      keyword: 'list/keyword',
    }),
    modelSearch: {
      get() {
        return this.keyword;
      },
      set(keyword) {
        this.setKeyword(keyword);
      },
    },
  },
  methods: {
    ...mapActions({
      setKeyword: 'list/setKeyword',
      getList: 'list/getList',
    }),
    handleForm() {
      this.getList({});
    },
  },
};
</script>


<style lang="scss" scoped>
$this: 'search';

section {
  &.component {
    &.is-#{$this} {
      margin-top: 0.5rem;
      padding-right: 0.5rem;
      input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 0;
        @media (min-width: 768px) {
          width: 400px;
        }
      }
      button {
        border-left: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}
</style>
