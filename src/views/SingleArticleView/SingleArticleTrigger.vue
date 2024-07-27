<script setup>
import Card from '@/components/Card.vue';

const props = defineProps({
  triggers: Array
})
</script>

<style lang="scss" scoped>
ul {
  // padding: 0;
  margin: 0;
  
  li {
    padding: 0;
    margin: 0;
  }
}
</style>

<template>
  <Card class="card-danger" v-if="triggers.length > 0">
    <ul v-if="triggers.length > 1">
      <li v-for="trigger in triggers">{{ trigger }}</li>
    </ul>
    <span v-if="triggers.length == 1">
      {{ triggers[0] }}
    </span>
  </Card>
</template>