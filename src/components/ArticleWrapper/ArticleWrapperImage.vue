<script setup>
  const props = defineProps({
    imgUrl: ""
  })
</script>

<style lang="scss">
  @import "@/sf-scss/responsive";

  .article-wrapper-image {
    img {
      width: 100%;
      aspect-ratio: 4 / 1;
      @include responsive(2) { aspect-ratio: 3 / 1; }
      @include responsive(1) { aspect-ratio: 5 / 2; }
      object-fit: cover;
    }
  }
</style>

<template>
  <div class="article-wrapper-image">
    <img :src="imgUrl" alt="Image for the article.">
  </div>
</template>