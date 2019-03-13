<template lang="pug">
  nav(aria-label="Page navigation example")
    ul.pagination.justify-content-center
      li.page-item.disabled
        a.page-link(href="#" tabindex="-1" aria-disabled="true") first
      li.page-item.disabled
        a.page-link(href="#" tabindex="-1" aria-disabled="true") &laquo;
      li.page-item.active
        a.page-link(href="#") 1
      li.page-item
        a.page-link(href="#") 2
      li.page-item
        a.page-link(href="#") 3
      li.page-item
        a.page-link(href="#") &raquo;
      li.page-item
        a.page-link(href="#") last
</template>
