<template lang="pug">
  .container
    .progress.progress-bar-animated
      .progress-bar.progress-bar-striped.progress-bar-animated(
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 100%")
</template>

<style lang="scss" scoped>
.progress {
  margin: 1rem 0;
}
</style>
