<script setup>
import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';

const props = defineProps({
  otherArticlesByAuthor: Array,
  latestArticles: Array,
  author: Object
})

</script>

<template>
  <SimpleContentWrapper>
    <hr class="hr-line" />
    <h3>More from {{ author.name }}</h3>
    <div v-for="article in otherArticlesByAuthor">
      <a :href="`/articles/${article.id}`">{{ article.title }}</a>
    </div>
    <br>
    <h3>Latest Articles</h3>
    <div v-for="article in latestArticles">
      <a :href="`/articles/${article.id}`">{{ article.title }}</a>
    </div>
  </SimpleContentWrapper>
</template>