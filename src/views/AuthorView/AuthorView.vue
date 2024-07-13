<script setup>
  import { useRoute } from 'vue-router';
  
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';

  import { loadArticlesByAuthorId } from '../LoadArticles';
  import { authors } from '@/assets/authors.json';
  import { onMounted, ref } from 'vue';

  const route = useRoute();
  const articles = ref([]);
  const authorId = route.params.authorId;

  const matchAuthorFromId = id => {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].id == id)
        return authors[i];
    }

    console.log(`unmatched author: id ${id}`)
  }

  const author = matchAuthorFromId(authorId);

  onMounted(async () => {
    loadArticlesByAuthorId(authorId, 7, 0, true).then(response => {
      console.log(response);
    });

    console.log(articles.value);
  })
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
      <div v-for="article in articles" class="article">
        {{ article.title }}
      </div>
    </div>
  </SimpleContentWrapper>
</template>