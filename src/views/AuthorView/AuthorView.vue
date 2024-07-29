<script setup>
  import { useRoute } from 'vue-router';
  
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
  import SimpleArticleGallery from '@/components/SimpleArticleGallery/SimpleArticleGallery.vue';

  import { loadArticlesByAuthorId } from '@/api/LoadArticles';
  import { authors } from '@/assets/authors.json';
  import { onMounted, ref } from 'vue';

  import Popper from "vue3-popper";

  const route = useRoute();
  const articles = ref([]);
  const authorId = route.params.authorId;

  const remaining = ref(1);
  let numberOfArticlesEvaluated = 0;
  const newArticleAmountInCycle = 3; // for test

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

<style lang="scss" scoped>
.author-badges {
  --popper-theme-background-color: rgba(51,51,51,51);
  --popper-theme-text-color: var(--color-bg);
  --popper-theme-border-radius: 2px;
  --popper-theme-padding: 0 6px;

  .author-badge {
    color: #fdbd00;
  }
}
</style>

<template>
  <SimpleContentWrapper>
    <h1 class="name">{{ author.name }}</h1>
    <div v-if="author.badges && author.badges.length != 0">
      <div class="author-badges">
        <Popper 
          content="This user is one of the first 15 contributors" 
          arrow 
          hover
          placement="bottom">

          <span class="author-badge material-symbols-outlined">
            stylus
          </span>
        </Popper>
      </div>
    </div>
    <p>{{ author.biography }}</p>
    <br />
    <h4>Latest Articles From {{ author.name }}</h4>
    <hr class="hr-line" />
    <!-- Gonna have an Article gallery here. -->
    <SimpleArticleGallery 
      :articles="articles" />
    <button v-if="remaining != 0" @click="loadArticleCycle">Load more articles</button>
  </SimpleContentWrapper>
</template>