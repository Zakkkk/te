<script setup>
  import './style.scss';

  import ArticleWrapperOuter from '@/components/ArticleWrapper/ArticleWrapperOuter.vue';
  import ArticleWrapperImage from '@/components/ArticleWrapper/ArticleWrapperImage.vue'
  
  import Dropdown from '@/components/Dropdown/Dropdown.vue'; // Adjust the path as needed
  import DropdownActivator from '@/components/Dropdown/DropdownActivator.vue';
  import DropdownContents from '@/components/Dropdown/DropdownContents.vue';
  import DropdownItem from '@/components/Dropdown/DropdownItem.vue';

  import { loadArticleById } from '../LoadArticles.js';
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
  }; // This doesnt work when marked.use(customHeadingId()) is also used
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

    <div class="article-wrapper-inner">
      <div class="headings">
        <span bold>contents</span>
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
              <DropdownItem v-for="heading in article.headings">
                <a :class="`heading-level-${heading.level}`" :href="`#${heading.id}`">{{ heading.title }}</a>
              </DropdownItem>
            </DropdownContents>
          </template>
        </Dropdown>
      </div>

      <div class="article-content">
        <ArticleWrapperImage :imgUrl="article.imgUrl" />
        <p class="author-biography">{{ author.biography }}</p>
        <div v-html="marked(article.content)"></div>
      </div>
    </div>
  </ArticleWrapperOuter>
</template>