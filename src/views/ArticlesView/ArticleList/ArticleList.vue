<script setup>
const props = defineProps({
  displayType: 0
});
</script>

<style lang="scss">
  @import '@/sf-scss/variables';
  @import '@/sf-scss/colors';
  @import '@/sf-scss/responsive';

  .article-list {
    &.article-list-displayType-0 {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
      // article { max-width: 500px; } // dont like this code

      gap: 25px;
      @include responsive(2) {
        gap: 16px;
      }
    }
    &.article-list-displayType-1 {
      > article:not(:last-of-type) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }

      > article:not(:first-of-type) {
        margin-top: 10px;
      }
    }
  }
</style>

<template>
  <div :class="'article-list article-list-displayType-' + props.displayType">
    <slot></slot>
  </div>
</template>