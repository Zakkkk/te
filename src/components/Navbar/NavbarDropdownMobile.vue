<script setup>
  import { ref } from 'vue';

  const isOpen = ref(false);

  const navToggle = () => {
    isOpen.value = !isOpen.value;
  }

  const props = defineProps({
    navHeight: 0,
    mobileNavActive: false
  })
</script>

<template>
  <div class="nav-mobile-dropdown-wrapper">
    <div class="nav-mobile-dropdown-activator" @click="navToggle">
      <span class="material-symbols-outlined">
        {{ isOpen ? 'close' : 'menu' }}
      </span>
    </div>

    <div
      :class="`nav-mobile-dropdown-content ${isOpen?'nav-mobile-dropdown-active':''}`" 
      :style="`bottom: ${props.navHeight}px`">
      <div class="nav-mobile-dropdown-content-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>