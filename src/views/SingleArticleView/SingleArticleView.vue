<script setup>
  import './style.scss';

  import ArticleWrapperOuter from './ArticleWrapper/ArticleWrapperOuter.vue';
  import ArticleWrapperImage from './ArticleWrapper/ArticleWrapperImage.vue'
  import SingleArticleMore from './SingleArticleMore.vue';
  import SingleArticleShare from './SingleArticleShare.vue';
  import SingleArticleMeta from './SingleArticleMeta.vue';
  import SingleArticleHeadings from './SingleArticleHeadings.vue';
  import SingleArticleTrigger from './SingleArticleTrigger.vue';

  import { loadArticleById, loadArticlesByAuthorId, loadArticles } from '@/api/LoadArticles.js';
  import exists from '@/util/exists.js';
  import { authors } from '@/assets/authors.json';
  import { marked } from 'marked';
  import customHeadingId from "marked-custom-heading-id";

  import clamp from '@/util/clamp';

  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();
  const customRenderer = new marked.Renderer();

  const progress = ref(0);

  const article = ref({
    content: 'loading...',
    date: 0
  });
  const author = ref({
    name: "loading author name...",
    id: -1,
  });

  const otherArticlesByAuthor = ref([]);
  const latestArticles = ref([]);
  const articleContentRef = ref(null);

  const matchAuthorFromId = id => {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].id == id)
        return authors[i]
    }

    console.log(`unmatched author: id ${id}`)
  }
  
  // customRenderer.heading = ({ text, depth }) => {
  //   const tagName = `h${depth + (depth!=6)}`;
  //   return `<${tagName}>${text}</${tagName}>`;
  // }; // This doesnt work when marked.use(customHeadingId()) is also used
  // but it does work if the heading doesnt have an id
  
  marked.setOptions({
    renderer: customRenderer,
    sanitize: true, // Ensure no unsafe HTML is rendered
    highlight: false // Disable code block highlighting
  });

  marked.use(customHeadingId());
  
  async function loadAllArticles() {
    otherArticlesByAuthor.value = [];
    latestArticles.value = [];

    function articleNotFound() {
      router.push('/articles/notfound');
    }

    loadArticleById(route.params.articleId, articleNotFound).then(loadedArticle => {
      article.value = loadedArticle;
      author.value = matchAuthorFromId(article.value.author);

      let needToLoadOneMoreArticleByAuthor = false;
      let lastEvaluatedPositionByAuthor = 0;

      let needToLoadOneMoreArticleLatest = false;
      let lastEvaluatedPositionLatest = 0;

      loadArticlesByAuthorId(article.value.author, 3, 0, false).then(response => {
        response.articles.forEach(authorArticle => {
          if (authorArticle.id == article.value.id) {
            needToLoadOneMoreArticleByAuthor = true;
            return;
          };

          otherArticlesByAuthor.value.push(authorArticle);
        })

        lastEvaluatedPositionByAuthor = response.numberOfArticlesEvaluated;

        if (needToLoadOneMoreArticleByAuthor)
          loadArticlesByAuthorId(article.value.author, 1, lastEvaluatedPositionByAuthor, false).then(response => {
            otherArticlesByAuthor.value.push(...response.articles); // should only return 1 at most

            lastEvaluatedPositionByAuthor = response.numberOfArticlesEvaluated; // probs not needed
          });
      })

      loadArticles(6, 0, null, false).then(response => {
        response.articles.forEach(latestArticle => {
          if (latestArticle.id == article.value.id) {
            needToLoadOneMoreArticleLatest = true;
            return;
          }

          latestArticles.value.push(latestArticle);
        })

        if (needToLoadOneMoreArticleLatest)
          loadArticles(1, latestArticles.value.length+1, null, false).then(response => {
            latestArticles.value.push(...response.articles); // should only return 1 at most
          });
      });
    });
  }

  onMounted(async () => {
    loadAllArticles();
  });

  watch (
    () => route.fullPath,
    async newId => {
      // if(!newId.includes('#')) {
      //   // document.getElementById('topnav').scrollIntoView();
      // }
      
      console.log(window.scroll)
      loadAllArticles();
    }
  );

  // function getScrollPercent() { // this is bad, because it isnt based on the article height but rather the page
  //   // return 100*clamp((4235.85 - articleContentRef.value.getBoundingClientRect().bottom)/4235.85, 0, 1);
  //   return 0;
  // }

  // function onScroll () {
  //   progress.value = getScrollPercent();
  // }

  // onMounted(() => {
  //   document.addEventListener('scroll', onScroll);
  // });

  // onUnmounted(() => {
  //   document.removeEventListener('scroll', onScroll);
  // });
</script>

<template>
  <div class="progress-bar" :style="`height: ${clamp(progress, 0, 100)}%`"></div>
  <ArticleWrapperOuter>
    <h1 class="article-title">{{ article.title }}</h1>

    <h4 class="article-hook">{{ article.hook }}</h4>

    <SingleArticleMeta 
      :author="author"
      :article-date="article.date"
      :article-length="article.content.split(' ').length"
    />

    <SingleArticleTrigger
      :triggers="exists(article.triggers) ? article.triggers : []"
    />

    <div class="article-wrapper-inner">
      <SingleArticleHeadings 
        :article-headings="article.headings"
        :article-title="article.title"
      />

      <div ref="articleContentRef" class="article-content">
        <ArticleWrapperImage :imgUrl="article.imgUrl" />
        <p class="author-biography">{{ author.biography }}</p>
        <div v-html="marked(article.content)"></div>
      </div>

      <SingleArticleShare
        :article-title="article.title"
        :author-name="author.name"
      />
    </div>

    <br>
    <br>

    <SingleArticleMore 
      :author="author"
      :latest-articles="latestArticles"
      :other-articles-by-author="otherArticlesByAuthor"
    />
  </ArticleWrapperOuter>
</template>