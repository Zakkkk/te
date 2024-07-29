<template>
  <simple-content-wrapper class="taller">
    <h1>Make a donation to The Thought Exchange</h1>
    <p>We'd love to have your support!</p>
    <p>We rely on donations from users to keep the site running.</p>
    <p>With enough generosity we can implement more features into the site and access better technology to provide a better experience.</p>
    <p>We use a site called Ko-fi to handle all donations.</p>
    <br>
    <a target="_blank" href="https://ko-fi.com/thethoughtexchange"><button class="button-primary">Make a Donation</button></a>
  </simple-content-wrapper>
</template>

<script setup>
import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
</script>

<style scoped>
.taller {
  min-height: 75vh;
}
</style>