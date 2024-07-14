<script setup>
  import { RouterView } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import Navbar from '@/components/Navbar/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  const isMobile = ref(window.innerWidth <= 768);

  onMounted(() => {
    window.addEventListener("resize", e => {
      isMobile.value = window.innerWidth <= 768;
    });
  });
</script>

<template>
  <Navbar :is-mobile="isMobile" />
  <RouterView />
  <Footer />
</template>
