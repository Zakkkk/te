<template>
  <div class="dropdown-item">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scoped>
.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
