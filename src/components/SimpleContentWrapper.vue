<style lang="scss">
@import "@/sf-scss/variables.scss";
@import "@/sf-scss/responsive.scss";

.simple-content-wrapper {
  width: 80%;
  max-width: $break-point-2;
  margin: auto;

  @include responsive(2) {
    width: 90%;
  }

  @include responsive(1) {
    width: 95%;
  }
}
</style>

<template>
  <div class="simple-content-wrapper">
    <slot></slot>
  </div>
</template>