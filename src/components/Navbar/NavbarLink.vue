<template>
  <div class="navbar-item">
    <RouterLink :to="props.linkLocation">{{ props.text }}</RouterLink>
  </div>
</template>

<script setup>
  const props = defineProps(['text', 'linkLocation']);
</script>

<style scoped lang="scss">
@import '@/sf-scss/variables';
@import '@/sf-scss/responsive';

.navbar-item {
  display: flex;
  @include responsive(1) { display: none; }
  align-items: center;

  a {
    padding: 4px;
    padding-top: 18px;
    padding-bottom: 18px;
    transition: color $sf-transition;

    &:hover {
      transition: color $sf-transition;

      color: var(--color-primary)
    }
  }
}
</style>