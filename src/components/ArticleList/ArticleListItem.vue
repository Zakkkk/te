<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

function getCurrentDateFormatted(date) {
  if (date == undefined || date == null)
    date = new Date().getTime();

  const newDate = new Date(date)

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(newDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

function getFormattedDateFromTimestamp(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();

  const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];

  const day = date.getDate();
  let daySuffix;
  if (day % 10 === 1 && day !== 11) {
      daySuffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
      daySuffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
      daySuffix = "rd";
  } else {
      daySuffix = "th";
  }

  return `${day}${daySuffix} ${month} ${year}`;
}

const props = defineProps({
  displayType: 0,
  articleId: 0,
  title: 'article title',
  imgUrl: '',
  authorId: 0,
  author: 'author',
  date: new Date().getTime(),
  description: 'description'
});

//
// Maybe an svg before the image loads
//

const articleURL = `/articles/${props.articleId}`;

</script>

<style lang="scss" scoped>
@import 'ArticleListItem';
</style>

<template>
  <article :class="`article-displayType-${props.displayType}`">
    <RouterLink :to="articleURL" class="article-image-wrapper">
      <img :alt="`Main image for '${props.title}'`" class="article-image" :src="props.imgUrl">
    </RouterLink>
    <div class="article-content-wrapper">
      <div class="article-title-wrapper">
        <RouterLink :to="articleURL"><h6 class="article-title">{{ props.title }}</h6></RouterLink>
      </div>
      <div class="article-meta-wrapper">
        <a class="article-author" :href="`/author/${props.authorId}`"><address>{{ props.author }}</address></a>
        <span class="article-meta-sep">/</span>
        <time class="article-date" :datetime="getCurrentDateFormatted(props.date)">{{ getFormattedDateFromTimestamp(props.date) }}</time>
      </div>
      <p class="article-description">{{ props.description }}</p>
    </div>
  </article>
</template>