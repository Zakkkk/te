<script setup>
  import ArticleWrapperOuter from '@/components/ArticleWrapper/ArticleWrapperOuter.vue';
  import ArticleWrapperInner from '@/components/ArticleWrapper/ArticleWrapperInner.vue';
  import ArticleWrapperImage from '@/components/ArticleWrapper/ArticleWrapperImage.vue'
  
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
  
  import { loadArticleById, loadAuthors } from './LoadArticles.js';
  import exists from '@/util/exists.js';
  import { authors } from '@/assets/authors.json';
  import { marked} from 'marked';
  import customHeadingId from "marked-custom-heading-id";

  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from "vue-router";
  import { RouterLink } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const customRenderer = new marked.Renderer();

  const article = ref({
    content: 'loading...',
    date: 0
  });
  const author = ref({
    name: "loading author name...",
    id: 0,
  });
  const headings = ref([]);
  // each heading object will include an id and a title

  const matchAuthorFromId = id => {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].id == id)
        return authors[i]
    }

    console.log(`unmatched author: id ${id}`)
  }

  customRenderer.heading = ({ text, depth }) => {
    const tagName = `h${depth + (depth!=6)}`;
    return `<${tagName}>${text}</${tagName}>`;
  };

  marked.setOptions({
    renderer: customRenderer,
    sanitize: true, // Ensure no unsafe HTML is rendered
    highlight: false // Disable code block highlighting
  });

  marked.use(customHeadingId());

  onMounted(async () => {
    function articleNotFound() {
      router.push('/articles/notfound');
    }

    loadArticleById(route.params.articleId, articleNotFound).then(loadedArticle => {
      article.value = loadedArticle;
      author.value = matchAuthorFromId(article.value.author);
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

  function getFormattedDateFromTime(timestamp) {
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

    return `${day}${daySuffix} ${month}, ${year}`;
  }

  function getReadLengthText(content) {
    if (!exists(content))
      return "";

    const articleLength = Math.ceil(content.split(' ').length/180);

    return `${articleLength} ${articleLength == 1 ? " minute" : " minutes"}`;
  }
</script>

<style lang="scss">
  @import "@/sf-scss/responsive";

  h1.article-title {
    font-size: 40px;
    @include responsive(2) { font-size: calc(1); } // need to calculate more
    @include responsive(1) { font-size: 29px; }

    margin-bottom: 16px;
  }

  h4.article-hook {
    font-size: 19px;

    margin-bottom: 25px;
  }

  .meta-wrapper {
    margin-bottom: 25px;
    display: flex;
    column-gap: 5px;
    font-size: 0.95rem;

    > * {
      display: inline;
    }

    a {
      color: var(--color-fg);
    }

    .article-readlength {
      display: inline-flex;
      align-items: center;
      column-gap: 5px;

      .material-symbols-outlined {
        font-size: 1.3em;
      }
    }
  }

  .point-sep {
    user-select: none;
    padding: 0 2px;
  }
</style>

<template>
  <ArticleWrapperOuter>
    <h1 class="article-title">{{ article.title }}</h1>

    <h4 class="article-hook">{{ article.hook }}</h4>

    <div class="meta-wrapper">
      <span>by</span>
      
      <address bold-semi><RouterLink :to="`/author/${author.id}`">{{ author.name }}</RouterLink></address>

      <span class="point-sep">&#8212;</span>

      <time
        :timestamp="getCurrentDateFormatted(article.date)" >
        {{ getFormattedDateFromTime(article.date) }}
      </time>

      <span class="point-sep">&#8212;</span>

      <span class="article-readlength">
        <span class="material-symbols-outlined">schedule</span>
        <span>{{ getReadLengthText(article.content) }}</span>
      </span>
    </div>

    <ArticleWrapperImage :imgUrl="article.imgUrl" />

    <br>

    <SimpleContentWrapper v-html="marked(article.content)" />
  </ArticleWrapperOuter>
</template>