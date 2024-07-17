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
    <div v-if="otherArticlesByAuthor.length != 0">
      <br>
      <h3>More from {{ author.name }}</h3>
      <br>
      <SimpleArticleGallery 
        :articles="otherArticlesByAuthor" />
      <br>
    </div>
    <h3>Latest Articles</h3>
    <br>
    <SimpleArticleGallery 
      :articles="latestArticles" />
  </SimpleContentWrapper>
</template>