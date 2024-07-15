<script setup>
import { RouterLink } from 'vue-router';
import { getCurrentDateFormatted, getFormattedDateFromTime } from '@/util/dates.js';

const props = defineProps({
  article: Object,
  author: Object,
})

</script>

<style lang="scss" scoped>
.simple-article-gallery-item {
  color: var(--color-fg);
  display: flex;
  flex-direction: column;

  .article-thumbnail {
    img {
      width: 100%;
      aspect-ratio: 5 / 3;
      object-fit: cover;
    }
  }

  .article-description-wrapper {
    // padding: 12px;

    .article-title {
      font-weight: 600;
      font-size: 1.2rem;
    }
    .article-author {}
    .article-date {}
  }
}
</style>

<template>
  <div class="simple-article-gallery-item">
    <div class="article-thumbnail">
      <RouterLink :to="`/articles/${article.id}`">
        <img :alt="`image for: ${article.title}`" :src="article.imgUrl">
      </RouterLink>
    </div>
    <div class="article-description-wrapper">
      <div class="article-title">
        <RouterLink :to="`/articles/${article.id}`">{{ article.title }}</RouterLink>
      </div>
      <div class="article-author">
        <RouterLink :to="`/author/${article.author}`"><address>{{ author.name }}</address></RouterLink>
      </div>
      <div class="article-date">
        <time :datetime="getCurrentDateFormatted(article.date)">
          {{ getFormattedDateFromTime(article.date) }}
        </time>
      </div>
    </div>
  </div>
</template>