<script setup>
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
</script>

<template>
  <SimpleContentWrapper>
    <h1>The Constitution</h1>
    <h4>The Official Code of Conduct</h4>

    <p>This is the constitution. Any violations of this code will result in your post or comment being taken down and/or not being published. </p>

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
        <li>Justify your responses with facts and/or reasoning and/or experience. Any unthoughtful responses will not be tolerated</li>
        <li>Any ad hominem, personal attacks rather than constructive discussion will not be tolerated</li>
        <li>Acknowledge and explicitly state any biases you may have with regards to this piece. This could be used as grounds for your post being rejected</li>
      </ol>
      <li>Appropriate posting</li>
      <ol>
        <li>Label all possible trigger warnings in the submission of your piece</li>
        <li>No gratuitous or overly sexual content is permitted</li>
        <li>No memes nor overly jovial posts or responses are permitted</li>
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