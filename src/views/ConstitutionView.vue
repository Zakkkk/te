<script setup>
  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
</script>

<template>
  <SimpleContentWrapper>
    <h1>The Constitution</h1>
    <h2>The Official Code of Conduct</h2>
    <hr class="hr-fancy">

    <ol class="constitution">
      <li>Don't be a dick (Act in a way that is welcoming, open and constructive)</li>
      <ol>
        <li>No hate speech</li>
        <ol>
          <li>Inflammatory or vilifying language will not be tolerated</li>
          <li>Gender, race, sexual orientation and nationality should only be commented on when explicitly important to the piece. Any unnecessary commentary will not be tolerated</li>
          <li>Inciting hate or bigotry will not be tolerated</li>
          <li>Calling action to violence</li>
        </ol>

        <li>Criticise ideas rather than personal attacks</li>
      </ol>

      <li>Thoughtfulness in responding/posting</li>
      <ol>
        <li>Justify with facts/give reasons/justify with experience</li>
      </ol>

      <li>Come with an open mind</li>
      <ol>
        <li>Acknowledge and explicitly state biases</li>
        <li>When reading a piece, consider the context of the person writing, including their biography or any additional information they have provided</li>
      </ol>

      <li>Appropriate posts</li>
      <ol>
        <li>Label possible trigger warnings</li>
        <li>No memes</li>
        <li>No gratuitous or overly sexual content</li>
      </ol>
    </ol>

  </SimpleContentWrapper>
</template>

<style scoped lang="scss">
@import "@/sf-scss/responsive";

ol {
  counter-reset: item
}

li {
  display: block
}

li:before {
  content: counters(item, ".") " ";
  counter-increment: item
}

.constitution {
  line-height: 2.25;
}

h1 {
  margin-top: 20px;
  @include responsive(1) { margin-top: 0; }
}
</style>