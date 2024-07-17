<script setup>
import { RouterLink } from 'vue-router';
import { getCurrentDateFormatted, getFormattedDateFromTime } from '@/util/dates.js';

const props = defineProps({
  article: Object,
  author: Object,
})
</script>

<style lang="scss" scoped>
@import '@/sf-scss/responsive';

.simple-article-gallery-item {
  color: var(--color-fg);
  display: flex;
  flex-direction: column;

  .article-thumbnail {
    img {
      width: 100%;
      aspect-ratio: 5 / 3;
      @include responsive(1) { aspect-ratio: 2 / 1; }
      object-fit: cover;

      border-radius: 10px;
    }
  }

  .article-description-wrapper {
    padding: 12px;
    padding-top: 4px;
    a { color: var(--color-fg); }

    .article-title {
      font-weight: 600;
      font-size: 1.2rem;
      line-height: 1.4;
      padding-bottom: 8px;
    }

    .simple-article-meta-wrapper {
      display: flex;
      column-gap: 30px;
      padding-bottom: 8px;
      
      .article-author {
        address { font-style: normal; }
      }
      .article-date {}
    }

    .article-description {
      // padding: 20px;
      line-height: 1.5;
    }
  }
}
</style>

<template>
  <RouterLink :to="`/articles/${article.id}`">
    <div class="simple-article-gallery-item">
      <div class="article-thumbnail">
        <!-- <RouterLink :to="`/articles/${article.id}`"> -->
        <img :alt="`image for: ${article.title}`" :src="article.imgUrl">
        <!-- </RouterLink> -->
      </div>
      <div class="article-description-wrapper">
        <div class="article-title">
          <RouterLink :to="`/articles/${article.id}`">{{ article.title }}</RouterLink>
        </div>
        <div class="simple-article-meta-wrapper">
          <div class="article-author">
            <RouterLink :to="`/author/${article.author}`"><address>{{ author.name }}</address></RouterLink>
          </div>
          <div class="article-date">
            <time :datetime="getCurrentDateFormatted(article.date)">
              {{ getFormattedDateFromTime(article.date) }}
            </time>
          </div>
        </div>
        <div class="article-description">
          {{ article.hook.slice(0, 200) }}
        </div>
      </div>
    </div>
  </RouterLink>
</template>