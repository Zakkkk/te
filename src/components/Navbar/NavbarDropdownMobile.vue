<script setup>
import { ref } from 'vue';
import NavbarDropdownMobileItem from './NavbarDropdownMobileItem.vue';

const isOpen = ref(false);

const navToggle = () => {
  isOpen.value = !isOpen.value;
}
</script>

<style lang="scss">
@import '@/sf-scss/responsive';
@import '@/sf-scss/colors';

@include responsive(1) {
  .nav-mobile-dropdown-wrapper {
    position: absolute;
    right: 0;
    left: 0;

    display: flex;

    [class*='nav-mobile-dropdown-icon-'] {
      > span {
        display: flex;
        align-items: center;
        line-height: 0;
        font-size: 36px;
        user-select: none;
      }
    }

    .nav-mobile-dropdown-icon-left {
      cursor: pointer; // not really needed on mobile lol
      margin-right: auto;
    }

    .nav-mobile-dropdown-icon-right {
      cursor: pointer;
      margin-left: auto;
    }
    
    .nav-mobile-dropdown-content {
      display: flex;
      align-items: center;

      position: fixed;
      z-index: -1;
      overflow: scroll;
      top: 0;
      left: 0;
      // left:40px; // this 40 is important(ish) because it is referenced in the box shadow
      right:0;
      bottom: 0;
      background: var(--color-bg);
      border-left: 1px solid $lgrey-3;
      box-shadow: -40px 0 0px 0px rgba(0,0,0,0.5);
      opacity: 0;
      margin-left: calc(100vw);
      transition: opacity $sf-transition-fast,
                  margin-left $sf-transition-fast;
                  // box-shadow $sf-transition;

      &.nav-mobile-dropdown-active {
        transition: opacity $sf-transition-fast,
                    margin-left $sf-transition-fast;
        z-index: 9;
        margin-left: 0;
        // box-shadow: 0;
        // display:block;
        opacity: 1;
      }

      .nav-mobile-dropdown-content-wrapper {
        width:100%;
      }
    }
  }
}
</style>

<template>
  <div class="nav-mobile-dropdown-wrapper">
    <RouterLink to="/articles" class="nav-mobile-dropdown-icon-left">
      <span class="material-symbols-outlined">
        newspaper
      </span>
    </RouterLink>

    <div class="nav-mobile-dropdown-icon-right" @click="navToggle">
      <span class="material-symbols-outlined">
        {{ isOpen ? 'close' : 'menu' }}
      </span>
    </div>

    <div
      :class="`nav-mobile-dropdown-content ${isOpen?'nav-mobile-dropdown-active':''}`"
      @click="isOpen=false" >
      <div class="nav-mobile-dropdown-content-wrapper">
        <div class="nav-mobile-dropdown-item">
          <a @click="navToggle" class="nav-mobile-dropdown-item"><span class="material-symbols-outlined">close</span></a>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>