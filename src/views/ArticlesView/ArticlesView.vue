<script setup>
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
  import { loadArticles } from '@/api/LoadArticles.js';
  import { ref, onMounted } from 'vue';
  import ArticleList from './ArticleList/ArticleList.vue';
  import ArticleListItem from './ArticleList/ArticleListItem.vue';
  import { authors } from '@/assets/authors.json';
  import cache from '@/util/cache.js';
  import exists from '@/util/exists.js';

  let defaultDisplayType = cache.get('displayType');

  if (!exists(defaultDisplayType))
    defaultDisplayType = 0;

  const cardType = ref(defaultDisplayType); // 0 = card, 1 = dense
  const newestFirst = ref(true);
  const searchFilter = ref("");

  const articles = ref([]);
  const remaining = ref(1);

  let numberOfArticlesLoaded = 0; // this is also the index we will be loading articles from i think
  const newArticleAmountInCycle = 6; // gonna change to 12 later or maybe more

  function setDensity(density) {
    cardType.value = density;
    cache.set('displayType', density);
  }

  function setOrder(order) {
    if (newestFirst.value == order) return;

    newestFirst.value = order;
    cache.set('newestFirst', order);

    articles.value = [];
    numberOfArticlesLoaded = 0;

    loadArticleCycle();
  }

  async function loadArticleCycle() {
    // console.log('load cycle called');
    // console.log(`aiming to load ${newArticleAmountInCycle} articles.`);
    // console.log(`will be loading from point ${numberOfArticlesLoaded}`)

    loadArticles(newArticleAmountInCycle, numberOfArticlesLoaded, null, !newestFirst.value).then(response => {
      console.log(response)
      
      articles.value.push(...response.articles);

      numberOfArticlesLoaded += response.articles.length;

      remaining.value = response.remaining;
    });
  }

  function getAuthorNameById(id) {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].id == id)
        return authors[i].name;
    }

    return `author #${id} not found`;
  }

  function onInputChange () {
    
  }

  onMounted(async ()=>{
    loadArticleCycle();
  });
</script>

<style scoped lang="scss">
.articles-filters {
  display: flex;
  align-items: center;
  column-gap: 20px;
}

.loadmore {
  padding: 20px;
  text-align: center;
}
</style>

<template>
  <SimpleContentWrapper>
    <h3>Search for an article</h3>
    <p>Begin by typing an article title, tags or related words.</p>
    <input 
      v-model="searchFilter"
      type="text"
      placeholder="Search for an article..."
      @input="onInputChange" />

    <!-- Maybe possibly highlight the parts that match -->

    <br>

    <div class="articles-filters">
      <div class="button-group">
        <button @click="setOrder(true)" :class="newestFirst == 1 ? 'button-active' : ''">
          Newest
        </button>
        <button @click="setOrder(false)" :class="newestFirst == 0 ? 'button-active' : ''">
          Oldest
        </button>
      </div>

      <div class="button-group">
        <button @click="setDensity(0)" :class="cardType == 0 ? 'button-active' : ''">
          <span class="material-symbols-outlined">view_day</span>
        </button>
        <button @click="setDensity(1)" :class="cardType == 1 ? 'button-active' : ''">
          <span class="material-symbols-outlined">density_small</span>
        </button>
      </div>
    </div>
    <!-- <br> -->
    <!-- <hr class="hr-line"/> -->
    <br>
    <ArticleList :displayType="cardType">
      <ArticleListItem
        v-for="article in articles"

        :displayType="cardType"

        :articleId="article.id"
        :title="article.title"
        :imgUrl="article.imgUrl"
        :authorId="article.author"
        :author="getAuthorNameById(article.author)"
        :date="article.date"
        :description="article.content.slice(0,220)"
        :searchFilter="searchFilter"
      />
    </ArticleList>
    
    <div class="loadmore" v-if="remaining!=0">
      <button @click="loadArticleCycle()">More Articles</button>
    </div>
  </SimpleContentWrapper>
</template>