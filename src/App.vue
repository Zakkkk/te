<script setup>
  import { RouterView } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import Navbar from '@/components/Navbar/Navbar.vue';
  import Footer from '@/components/Footer.vue';

  const mobileOffset = ref(0);
  
  const updateMobileOffset = value => {
    mobileOffset.value = value;
  }
  
  const isMobile = ref(window.innerWidth <= 768);

  onMounted(() => {
    window.addEventListener("resize", e => {
      isMobile.value = window.innerWidth <= 768;
      // mobileOffset.value = topnavHeight.value
    });
  });
</script>

<template>
  <Navbar @update-mobile-offset="updateMobileOffset" :is-mobile="isMobile"/>
  <div id="page">
    <RouterView />
    <Footer id="footer" />
  </div>
</template>

<style scoped>
  #page {
    padding-bottom: v-bind(`${mobileOffset * isMobile}px`);
  }
</style>