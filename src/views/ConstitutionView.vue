<script setup>
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
</script>

<template>
  <SimpleContentWrapper>
    <h1>The Constitution</h1>
    <h4>The Official Code of Conduct</h4>
    <hr class="hr-fancy">

    <ol id="constitution">
      <li>Act in a way that is welcoming, open and constructive</li>
      <ol>
        <li>Inflammatory or vilifying language will not be tolerated</li>
        <li>
          Gender, race, sexual orientation and nationality should only be commented on when explicitly important to the piece. Any unnecessary commentary will not be tolerated
        </li>
        <li>Inciting hate or bigotry will not be tolerated</li>
        <li>Calling action to violence will not be tolerated</li>
      </ol>
      <li>Thoughtfulness in responding and posting</li>
      <ol>
        Justify your responses with facts and/or reasoning and/or experience. Any unthoughtful responses will not be tolerated
      </ol>
    </ol>

  </SimpleContentWrapper>
</template>

<style scoped lang="scss">
@import "@/sf-scss/responsive";

// ol {
//   counter-reset: item
// }

// li {
//   display: block
// }

// li:before {
//   content: counters(item, ".") " ";
//   counter-increment: item
// }

#constitution {
  line-height: 2.25;
}
</style>