<script setup>
  import { useRoute } from 'vue-router';
  
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';

  import { loadArticlesByAuthorId } from '../LoadArticles';
  import { authors } from '@/assets/authors.json';
  import { onMounted, ref } from 'vue';

  const route = useRoute();
  const articles = ref([]);
  const authorId = route.params.authorId;

  const remaining = ref(1);
  let numberOfArticlesEvaluated = 0;
  const newArticleAmountInCycle = 6; // for test

  const matchAuthorFromId = id => {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].id == id)
        return authors[i];
    }

    console.log(`unmatched author: id ${id}`)
  }

  const author = matchAuthorFromId(authorId);


  async function loadArticleCycle() {
    // console.log('load cycle called');
    // console.log(`aiming to load ${newArticleAmountInCycle} articles.`);
    // console.log(`will be loading from point ${numberOfArticlesLoaded}`)

    loadArticlesByAuthorId(
      authorId,
      newArticleAmountInCycle,
      numberOfArticlesEvaluated,
      false
    ).then(response => {
      console.log(response)
      
      articles.value.push(...response.articles);

      numberOfArticlesEvaluated += response.numberOfArticlesEvaluated;

      remaining.value = response.remaining;
    });
  }

  onMounted(async () => {
    loadArticleCycle();
  })
</script>

<style lang="scss">
.articles-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1fr, 200px));
}
</style>

<template>
  <SimpleContentWrapper>
    <h1>{{ author.name }}</h1>
    <p>{{ author.biography }}</p>
    <br />
    <h4>Latest Articles From {{ author.name }}</h4>
    <hr class="hr-line" />
    <div class="articles-wrapper">
      <div v-for="article in articles" class="article">
        <div class="article-title">
          <RouterLink :to="`/articles/${article.id}`">{{ article.title }}</RouterLink>
        </div>
      </div>
    </div>
    <button class="button-full" v-if="remaining != 0" @click="loadArticleCycle">loadArticleCycle()</button>
  </SimpleContentWrapper>
</template>