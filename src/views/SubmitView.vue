<script setup>
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
  import { RouterLink } from 'vue-router';
</script>

<template>
  <SimpleContentWrapper>
    <h1>Submit a Post</h1>
    <p>Do you want to submit a post to The Thought Exchange?</p>
    <br>
    <p bold>Fill out <a href="https://docs.google.com/forms/d/e/1FAIpQLScbaxEDeF8SMTv839MY6eo1oeeG6pvpxOS0NBGcqrbjhHv8Og/viewform?usp=sf_link">this form</a>.
    </p>
    <br>
    <p>Before you begin writing your submission, it is important to read through our <RouterLink to="/constitution">Constitution</RouterLink>, which defines all our rules regarding posting. This page outlines general suggestions on how to write a good post.</p>
    <br>
    <h3>We like:</h3>
    <ul>
      <li>Open mindedness</li>
      <li>Acknowledgement of biases</li>
      <li>Well researched opinions with sources</li>
      <li>Well thought out articles</li>
      <li>Acknowledgements of drawbacks in argument</li>
      <li>Headings to separate contents of a page</li>
      <li>Following rules of our <RouterLink to="/constitution">constitution</RouterLink></li>
    </ul>
    <h3>We don't like:</h3>
    <ul>
      <li>Potentially harmful writing</li>
      <li>Aggressive writing</li>
      <li>Short pieces</li>
      <li>Overly technical language</li>
      <li>Overly vulgar language</li>
    </ul>
  </SimpleContentWrapper>
</template>