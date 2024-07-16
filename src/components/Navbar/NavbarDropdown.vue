<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    text: ""
  });

  const dropdownActive = ref(false);

  const toggleDropdown = () => {
    dropdownActive.value = !dropdownActive.value;
  }

  const hasParentelement = (e, classNameToMatch) => {
    let targetElement = e.target;

    while (targetElement) {
      if (targetElement.classList && targetElement.classList.contains(classNameToMatch)) {
        return true;
      }

      targetElement = targetElement.parentElement;
    }

    return false;
  }

  document.addEventListener('mousedown', e => {
    if (dropdownActive.value) {
      if (!hasParentelement(e, 'navbar-dropdown-wrapper')) {
        dropdownActive.value = false;
      }
    }
  })
</script>

<style lang="scss">
@import '@/sf-scss/colors';
@import '@/sf-scss/responsive';

.navbar-dropdown-wrapper {
  display: inline-block;
  @include responsive(1) { display: none; }
  position: relative;

  .navbar-dropdown-activator {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    padding-top: 18px;
    padding-bottom: 18px;

    .navbar-dropdown-icon {
      user-select: none;
    }
  }

  .navbar-dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 2px;
    border: 2px solid $lgrey-3;
    padding: 6px 0;
    z-index: 1;
    top: 50px;
    right: 0;

    .navbar-item {
      a {
        padding: 12px 20px !important; // this hurts me
        display: block;
        width: 100%;
        font-weight: 500;
      }
    }

    .navbar-item:hover {
      background: darken(#fcfcfc, 10%);
      a {color: var(--color-fg) !important; }// I know i know but im lazy
    }

    &.navbar-dropdown-active {
      display: block;
    }
  }

  &:hover, &:focus {
    .navbar-dropdown-content {
      display: block;
    }
  }
}
</style>

<template>
  <div class="navbar-dropdown-wrapper">
    <div class="navbar-dropdown-activator" @mousedown="toggleDropdown">
      {{ props.text }}
      <span class="material-symbols-outlined navbar-dropdown-icon">
        {{ dropdownActive ? "arrow_drop_up" : "arrow_drop_down" }}
      </span>
    </div>
    <div :class="`navbar-dropdown-content ${dropdownActive ? 'navbar-dropdown-active' : ''}`">
      <slot></slot>
    </div>
  </div>
</template>