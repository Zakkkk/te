<script setup>
  const props = defineProps({
    imgUrl: ""
  })
</script>

<style lang="scss">
  @import "@/sf-scss/responsive";

  .article-wrapper-image {
    img {
      margin-bottom: 6px !important;
      width: 100% !important; // bad practise but idc lol, the images in the article will effect this
      aspect-ratio: 2.5 / 1;
      @include responsive(2) { aspect-ratio: 2 / 1; }
      @include responsive(1) { aspect-ratio: 1.5 / 1; }
      object-fit: cover;
    }
  }
</style>

<template>
  <div class="article-wrapper-image">
    <img :src="imgUrl" alt="Image for the article.">
  </div>
</template>