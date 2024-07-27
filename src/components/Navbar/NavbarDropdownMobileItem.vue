<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  text: String,
  linkLocation: String,
})
</script>

<style lang="scss"> // not scoped because navbardropdownmobile usees this class for close
.nav-mobile-dropdown-item {
  a {
    text-align: center;
    display: block;
    width: 100%;
    font-size:1.6rem;
  }
}
</style>

<template>
  <div class="nav-mobile-dropdown-item">
    <RouterLink :to="linkLocation">{{ text }}</RouterLink>
  </div>
</template>