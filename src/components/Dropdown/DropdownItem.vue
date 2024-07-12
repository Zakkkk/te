<template>
  <div class="dropdown-item">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scope lang="scss">
.dropdown-item {
  padding: 12px 20px;
  font-weight: 500;
  cursor: pointer;

  a {
    display: block;
  }
}

.dropdown-item:hover {
  background-color: darken(#fcfcfc, 10%);
}
</style>
