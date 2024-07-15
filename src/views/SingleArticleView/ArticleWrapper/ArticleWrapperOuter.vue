<template>
  <div class="article-wrapper-outer">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  @import "@/sf-scss/responsive";

  .article-wrapper-outer {
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 20px;
  }
</style>