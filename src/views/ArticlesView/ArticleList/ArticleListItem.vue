<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

import { getCurrentDateFormatted, getFormattedDateFromTime } from '@/util/dates';

const props = defineProps({
  displayType: 0,
  articleId: 0,
  title: 'article title',
  imgUrl: '',
  authorId: 0,
  author: 'author',
  date: new Date().getTime(),
  description: 'description',
  searchFilter: ''
});

function isVisible() {
    return  props.title.toLowerCase().includes(props.searchFilter.trim().toLowerCase()) ||
            props.description.toLowerCase().includes(props.searchFilter.trim().toLowerCase()) ||
            props.author.toLowerCase().includes(props.searchFilter.trim().toLowerCase());
  }

//
// Maybe an svg before the image loads
//

const articleURL = `/articles/${props.articleId}`;

</script>

<style lang="scss" scoped>
@import 'ArticleListItem';
</style>

<template>
  <article :class="`article-displayType-${props.displayType}`" v-if="isVisible()">
    <RouterLink :to="articleURL" class="article-image-wrapper">
      <img :alt="`Main image for '${props.title}'`" class="article-image" :src="props.imgUrl">
    </RouterLink>
    <div class="article-content-wrapper">
      <div class="article-title-wrapper">
        <RouterLink :to="articleURL"><h6 class="article-title">{{ props.title }}</h6></RouterLink>
      </div>
      <div class="article-meta-wrapper">
        <RouterLink class="article-author" :to="`/author/${props.authorId}`"><address>{{ props.author }}</address></RouterLink>
        <span class="article-meta-sep">/</span>
        <time class="article-date" :datetime="getCurrentDateFormatted(props.date)">{{ getFormattedDateFromTime(props.date) }}</time>
      </div>
      <p class="article-description">
        <RouterLink :to="articleURL">{{ props.description }}</RouterLink>
      </p>
    </div>
  </article>
</template>