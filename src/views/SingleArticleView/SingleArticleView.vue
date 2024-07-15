<script setup>
  import './style.scss';

  import ArticleWrapperOuter from '@/components/ArticleWrapper/ArticleWrapperOuter.vue';
  import ArticleWrapperImage from '@/components/ArticleWrapper/ArticleWrapperImage.vue'
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
  
  import Dropdown from '@/components/Dropdown/Dropdown.vue'; // Adjust the path as needed
  import DropdownActivator from '@/components/Dropdown/DropdownActivator.vue';
  import DropdownContents from '@/components/Dropdown/DropdownContents.vue';
  import DropdownItem from '@/components/Dropdown/DropdownItem.vue';

  import { loadArticleById, loadArticlesByAuthorId, loadArticles } from '@/api/LoadArticles.js';
  import exists from '@/util/exists.js';
  import { authors } from '@/assets/authors.json';
  import { marked} from 'marked';
  import customHeadingId from "marked-custom-heading-id";
  import clamp from '@/util/clamp';

  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRoute, useRouter } from "vue-router";
  import { RouterLink } from 'vue-router';

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
  
  onMounted(async () => {
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

      loadArticles(3, 0, null, false).then(response => {
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

  function getScrollPercent() { // this is bad, because it isnt based on the article height but rather the page
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
  }

  function onScroll () {
    progress.value = getScrollPercent();
  }

  onMounted(() => {
    document.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    document.removeEventListener('scroll', onScroll);
  });
</script>

<template>
  <div class="progress-bar" :style="`height: ${clamp(progress, 0, 100)}%`"></div>
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

    <div class="article-wrapper-inner">
      <div class="headings">
        <span bold>Contents</span>
        <hr class="hr-line">
        <a v-for="heading in article.headings" :href="`#${heading.id}`" :class="`heading heading-level-${heading.level}`">
          {{ heading.title }}
        </a>

        <span v-if="!exists(article.headings) || article.headings.length == 0">
          {{ article.title }}
        </span>
      </div>

      <div class="headings-mobile" v-if="exists(article.headings) && article.headings.length != 0">
        <Dropdown style="display: block;">
          <template #activator>
            <DropdownActivator>
              <button class="button-full button-headings">
                <span class="material-symbols-outlined">toc</span>
                View Contents
                <span class="material-symbols-outlined">arrow_drop_down</span>
              </button>
            </DropdownActivator>
          </template>
          <template #contents>
            <DropdownContents>
              <!-- <DropdownItem v-for="heading in article.headings">
                <a :class="`heading-level-${heading.level}`" :href="`#${heading.id}`">{{ heading.title }}</a>
              </DropdownItem> -->
              <a :href="`#${heading.id}`" v-for="heading in article.headings">
                <DropdownItem>
                  <span :class="`heading-level-${heading.level}`">{{ heading.title }}</span>
                </DropdownItem>
              </a>
            </DropdownContents>
          </template>
        </Dropdown>
      </div>

      <div class="article-content">
        <ArticleWrapperImage :imgUrl="article.imgUrl" />
        <p class="author-biography">{{ author.biography }}</p>
        <div v-html="marked(article.content)"></div>
      </div>

      <div class="article-share-wrapper">
        <div class="article-share">
          <div class="article-share-link">
            <span class="material-symbols-outlined">share</span>
          </div>
          <div class="article-share-link">
            <span class="article-share-link-instagram"></span>
          </div>
          <div class="article-share-link">
            <span class="article-share-link-twitter"></span>
          </div>
          <div class="article-share-link">
            <span class="article-share-link-facebook"></span>
          </div>
        </div>
      </div>
    </div>

    <br>

    <SimpleContentWrapper>
      <hr class="hr-line" />
      <h3>More from {{ author.name }}</h3>
      <div v-for="article in otherArticlesByAuthor">
        <a :href="`/articles/${article.id}`">{{ article.title }}</a>
      </div>
      <br>
      <h3>Latest Articles</h3>
      <div v-for="article in latestArticles">
        <a :href="`/articles/${article.id}`">{{ article.title }}</a>
      </div>
    </SimpleContentWrapper>
  </ArticleWrapperOuter>
</template>