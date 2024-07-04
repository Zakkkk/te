<template>
  <div class="navbar-item">
    <RouterLink :to="props.linkLocation">{{ props.text }}</RouterLink>
  </div>
</template>

<script setup>
  const props = defineProps(['text', 'linkLocation']);
</script>