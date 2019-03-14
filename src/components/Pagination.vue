<template lang="pug">
  nav(aria-label="Page navigation example")
    ul.pagination.justify-content-center
      li.page-item(:class="{ 'disabled': !links.prev }")
        a.page-link(href="javascript:;"  @click="goToFirst()" v-if="links.prev") first
        a.page-link(href="javascript:;" tabindex="-1" aria-disabled="true" v-else) first
      li.page-item(:class="{ 'disabled': !links.prev }")
        a.page-link(href="javascript:;"  @click="goToPrev()" v-if="links.prev") &laquo;
        a.page-link(href="javascript:;" tabindex="-1" aria-disabled="true" v-else) &laquo;

      li.page-item(v-for="num in nums" :class="{ 'active': num == page.number }")
        a.page-link(href="javascript:;" @click="goTo(num)") {{ num + 1 }}

      li.page-item(:class="{ 'disabled': !links.next }")
        a.page-link(href="javascript:;" @click="goToNext()" v-if="links.next") &raquo;
        a.page-link(href="javascript:;" tabindex="-1" aria-disabled="true" v-else) &raquo;
      li.page-item(:class="{ 'disabled': !links.next }")
        a.page-link(href="javascript:;" @click="goToLast()" v-if="links.next") last
        a.page-link(href="javascript:;" tabindex="-1" aria-disabled="true" v-else) last
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Pagination',
  computed: {
    ...mapGetters({
      page: 'list/page',
      links: 'list/links',
    }),
    nums() {
      const numbers = [];
      const totalPages = this.page.totalPages - 1;
      if (this.page.number >= 2) numbers.push(this.page.number - 2);
      if (this.page.number >= 1) numbers.push(this.page.number - 1);
      numbers.push(this.page.number);
      if (totalPages - this.page.number >= 1) numbers.push(this.page.number + 1);
      if (totalPages - this.page.number >= 2) numbers.push(this.page.number + 2);
      if (numbers.indexOf(totalPages) < 0) numbers.push(totalPages);
      return numbers;
    }
  },
  methods: {
    ...mapActions({
      getList: 'list/getList',
    }),
    goToFirst() {
      const params = { type: 'first' };
      this.getList(params);
    },
    goToPrev() {
      const params = { type: 'prev' };
      this.getList(params);
    },
    goToNext() {
      const params = { type: 'next' };
      this.getList(params);
    },
    goToLast() {
      const params = { type: 'last' };
      this.getList(params);
    },
    goTo(number) {
      const params = {
        goto: {
          number,
        },
        keyword: 'P!NK',
      };
      this.getList(params);
    },
  },
};
</script>
