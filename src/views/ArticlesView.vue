<script setup>
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
  import { loadArticles } from './LoadArticles.js';
  import { ref, onMounted } from 'vue';
  import ArticleList from '@/components/ArticleList/ArticleList.vue';
  import ArticleListItem from '@/components/ArticleList/ArticleListItem.vue';
  import { authors } from '@/assets/authors.json';
  import cache from '@/util/cache.js';
  import exists from '@/util/exists.js';

  let defaultDisplayType = cache.get('displayType');

  if (!exists(defaultDisplayType)) {
    defaultDisplayType = 0;
  }

  const cardType = ref(defaultDisplayType);
  // 0 = card
  // 1 = dense

  const articles = ref([]);

  function setDensity(density) {
    cardType.value = density;
    cache.set('displayType', density);
  }

  let numberOfArticlesLoaded = 0; // this is also the index we will be loading articles from i think

  async function loadArticleCycle() {
    
  }

  function getAuthorNameById(id) {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].id == id)
        return authors[i].name
    }

    return `author #${id} not found`;
  }

  onMounted(async ()=>{
    loadArticles(6).then(loadedArticles => {
      articles.value = loadedArticles;
    });
  });
</script>

<style scoped lang="scss">
.loadmore {
  padding: 20px;
  text-align: center;
}
</style>

<template>
  <SimpleContentWrapper>
    <h3>Search for an article</h3>
    <p>Begin by typing an article title, tags or related words.</p>
    <input type="text" placeholder="Search for an article...">

    <!-- Maybe possibly highlight the parts that match -->

    <br>
    <hr class="hr-line"/>
    <div class="sf-grid sf-grid-maximise-on-2">
      <div class="col-3">
        <aside>
          <div class="button-group button-group-full">
            <button @click="setDensity(0)" :class="cardType == 0 ? 'button-active' : ''">
              <span class="material-symbols-outlined">view_day</span>
            </button>
            <button @click="setDensity(1)" :class="cardType == 1 ? 'button-active' : ''">
              <span class="material-symbols-outlined">density_small</span>
            </button>
          </div>
        </aside>
      </div>
      <div class="col-9">
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
          />
        </ArticleList>
      </div>
    </div>
    <div class="loadmore">
      <button>More Articles</button>
    </div>
  </SimpleContentWrapper>
</template>