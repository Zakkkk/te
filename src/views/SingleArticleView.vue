<script setup>
  import { loadArticleById, loadAuthors } from './LoadArticles.js';
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
  import { ref, onMounted } from 'vue';
  import { useRoute } from "vue-router";

  const route = useRoute()

  const article = ref({});
  const author = ref({});

  onMounted(async () => {
    loadArticleById(route.params.articleId).then(loadedArticle => {
      article.value = loadedArticle;
    });
    loadAuthors().then(loadedAuthors => {
      author.value = loadedAuthors.authors[article.value.author];
    });
  });
</script>

<template>
  <SimpleContentWrapper>
    <h1>{{ article.title }}</h1>
    <h2>{{ article.hook }}</h2>
    <h3>{{ author.name }}</h3>
    <img :src="article.imgUrl" alt="Image for the article">
    <p>{{ article.content }}</p>
  </SimpleContentWrapper>
</template>