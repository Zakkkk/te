<script setup>
import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
import SimpleArticleGallery from '@/components/SimpleArticleGallery/SimpleArticleGallery.vue';

const props = defineProps({
  otherArticlesByAuthor: Array,
  latestArticles: Array,
  author: Object
})

</script>

<template>
  <SimpleContentWrapper>
    <hr class="hr-line" />
    <h3>More from {{ author.name }}</h3>
    <SimpleArticleGallery 
      :articles="otherArticlesByAuthor" />
    <br>
    <h3>Latest Articles</h3>
    <SimpleArticleGallery 
      :articles="latestArticles" />
  </SimpleContentWrapper>
</template>