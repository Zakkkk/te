<script setup>
import { RouterLink } from 'vue-router';
import { getCurrentDateFormatted, getFormattedDateFromTime } from '@/util/dates.js';

const props = defineProps({
  author: Object,
  articleDate: Number,
  articleLength: Number
})

function getReadLengthText(length) {
  // if (!exists(content))
  //   return "";

  const articleTime = Math.ceil(length/180);

  return `${articleTime} ${articleTime == 1 ? " minute" : " minutes"}`;
}
</script>

<style scoped lang="scss">
.meta-wrapper {
  margin-bottom: 25px;
  display: flex;
  column-gap: 5px;
  font-size: 0.95rem;

  > * {
    display: inline;
  }

  a {
    color: var(--color-fg);
  }

  .article-readlength {
    display: inline-flex;
    align-items: center;
    column-gap: 5px;

    .material-symbols-outlined {
      font-size: 1.3em;
    }
  }
}

.point-sep {
  user-select: none;
  padding: 0 2px;
}
</style>

<template>
  <div class="meta-wrapper">
    <span>by</span>
    
    <address bold-semi><RouterLink :to="`/author/${author.id}`">{{ author.name }}</RouterLink></address>

    <span class="point-sep">&#8212;</span>

    <time
      :timestamp="getCurrentDateFormatted(articleDate)" >
      {{ getFormattedDateFromTime(articleDate) }}
    </time>

    <span class="point-sep">&#8212;</span>

    <span class="article-readlength">
      <span class="material-symbols-outlined">schedule</span>
      <span>{{ getReadLengthText(articleLength) }}</span>
    </span>
  </div>
</template>