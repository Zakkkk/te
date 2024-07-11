<script setup>
  import ArticleWrapperOuter from '@/components/ArticleWrapper/ArticleWrapperOuter.vue';
  import ArticleWrapperInner from '@/components/ArticleWrapper/ArticleWrapperInner.vue';
  import ArticleWrapperImage from '@/components/ArticleWrapper/ArticleWrapperImage.vue'
  
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
  
  import { loadArticleById, loadAuthors } from './LoadArticles.js';
  import { authors } from '@/assets/authors.json';
  import { ref, onMounted } from 'vue';
  import { useRoute } from "vue-router";

  const route = useRoute()

  const article = ref({});
  const author = ref({});

  const matchAuthorFromId = id => {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].id == id)
        return authors[i]
    }

    console.log(`unmatched author: id ${id}`)
  }

  onMounted(async () => {
    loadArticleById(route.params.articleId).then(loadedArticle => {
      article.value = loadedArticle;
      author.value = matchAuthorFromId(article.value.author)
    });
  });

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
</script>

<style lang="scss">
  @import "@/sf-scss/responsive";

  h1.article-title {
    font-size: 40px;
    @include responsive(2) { font-size: calc(1.3vw + 25px); }
    @include responsive(1) { font-size: 29px; }

    margin-bottom: 16px;
  }

  h4.article-hook {
    font-size: 19px;
  }

  .meta-wrapper {
    
  }
</style>

<template>
  <ArticleWrapperOuter>
    <h1 class="article-title">{{ article.title }}</h1>

    <h4 class="article-hook">{{ article.hook }}</h4>

    <div class="meta-wrapper">
      <address>{{ author.name }}</address>
      <time
        :timestamp="getCurrentDateFormatted(article.date)"
        >{{ getFormattedDateFromTimestamp(article.date) }}</time>
    </div>

    <ArticleWrapperImage :imgUrl="article.imgUrl" />

    <br>

    <SimpleContentWrapper>
      <p>{{ article.content }}</p>
    </SimpleContentWrapper>
  </ArticleWrapperOuter>
</template>