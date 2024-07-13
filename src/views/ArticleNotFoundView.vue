<script setup>
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
  import { RouterLink } from 'vue-router';
</script>

<template>
  <SimpleContentWrapper>
    <h4>This article was not found.</h4>
    <p>You can find all of our articles <RouterLink to="/articles">here</RouterLink>.</p>
    <p>If you think this is an issue you can <RouterLink to="/contact">contact us</RouterLink>.</p>
  </SimpleContentWrapper>
</template>