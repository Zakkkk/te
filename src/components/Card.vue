<template>
  <div class="card">
    <div class="card-title">
      {{ title }}
    </div>
    <div class="card-contents">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sf-scss/colors';

.card {
  border: 2px solid $lgrey-3;
  border-radius: 2px;

  padding: 16px;
  background: #fff;

  .card-title {
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 4px;
  }

  &.card-success {
    border-color: var(--color-success-border);
    background: var(--color-success-bg);
    color: var(--color-success-fg);;
  }

  &.card-warning {
    border-color: var(--color-warning-border);
    background: var(--color-warning-bg);
    color: var(--color-warning-fg);;
  }

  &.card-danger {
    border-color: var(--color-danger-border);
    background: var(--color-danger-bg);
    color: var(--color-danger-fg);;
  }
}
</style>

<script setup>
  const props = defineProps({
    title: String
    // Maybe eventually include a canClose prop
  })
</script>