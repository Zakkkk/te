<script setup>
import SimpleArticleGalleryItem from './SimpleArticleGalleryItem.vue';
import { getAuthorById } from '@/api/LoadArticles.js';

const props = defineProps({
  articles: Array
})
</script>

<style lang="scss">
@import '@/sf-scss/colors';
@import '@/sf-scss/responsive';

.simple-article-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
  gap: 25px;
  @include responsive(2) { gap: 16px }
  @include responsive(1) { gap: 12px }
}
</style>

<template>
  <div class="simple-article-gallery">
    <SimpleArticleGalleryItem 
      v-for="article in articles"
      :author="getAuthorById(article.author)"
      :article="article"
    />
  </div>
</template>