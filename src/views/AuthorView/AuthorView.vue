<script setup>
  import { useRoute } from 'vue-router';
  
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';

  import { loadArticlesByAuthorId } from '../LoadArticles';
  import { authors } from '@/assets/authors.json';

  const route = useRoute();
  const authorId = route.params.authorId;

  const matchAuthorFromId = id => {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].id == id)
        return authors[i];
    }

    console.log(`unmatched author: id ${id}`)
  }

  const author = matchAuthorFromId(authorId);
</script>

<style lang="scss">
.articles-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(295px, 1fr));
}
</style>

<template>
  <SimpleContentWrapper>
    <h1>{{ author.name }}</h1>
    <p>{{ author.biography }}</p>
    <br />
    <h4>Most Recent Articles</h4>
    <hr class="hr-line" />
    <div class="articles-wrapper">
      <div class="article">article</div>
      <div class="article">article</div>
      <div class="article">article</div>
      <div class="article">article</div>
      <div class="article">article</div>
      <div class="article">article</div>
    </div>
  </SimpleContentWrapper>
</template>