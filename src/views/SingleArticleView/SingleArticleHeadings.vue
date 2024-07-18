<script setup>
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import DropdownItem from '@/components/Dropdown/DropdownItem.vue';

import exists from '@/util/exists';

const props = defineProps({
  articleHeadings: Array,
  articleTitle: String
})

</script>

<style lang="scss">
@import "@/sf-scss/responsive";

.headings {
  position: sticky;
  top: 10px;
  @include responsive(1) {
    position: static;
    top: 0;
    display: none;
  }

  align-self: start;
  padding-right: 30px;

  .heading {
    // is an a tag
    display: block;
    $base-font-size: 16px;
    line-height: 1.3;
    margin-bottom: 10px;

    &.heading-level-1 {
      padding-left: 0px;
      font-size: calc($base-font-size);
    }
    
    &.heading-level-2 {
      padding-left: 6px;
      font-size: calc($base-font-size*.93);
    }
  
    &.heading-level-3 {
      padding-left: 12px;
      font-size: calc($base-font-size*.88);
    }

    @include responsive(2) {
      &.heading-level-1 {
        padding-left: 0px;
        font-size: calc($base-font-size*.88);
      }
      
      &.heading-level-2 {
        padding-left: 6px;
        font-size: calc($base-font-size*.9*.9);
      }
    
      &.heading-level-3 {
        padding-left: 12px;
        font-size: calc($base-font-size*.8*.9);
      }
    }
      
  }
}

.headings-mobile {
  display: none;
  @include responsive(1) { display: block; }

  margin-bottom: 25px;

  .button-headings {
    display: flex;
    align-items: center;
    column-gap: 20px;

    :last-child {
      margin-left: auto;
    }
  }

  .dropdown-menu {
    .heading-level-1 {
      padding-left: 0px;
    }
    
    .heading-level-2 {
      padding-left: 6px;
    }
  
    .heading-level-3 {
      padding-left: 12px;
    }
  }
}
</style>

<template>
  <div class="headings">
    <span bold>Contents</span>
    <hr class="hr-line">
    <a v-for="heading in articleHeadings" :href="`#${heading.id}`" :class="`heading heading-level-${heading.level}`">
      {{ heading.title }}
    </a>

    <span v-if="!exists(articleHeadings) || articleHeadings.length == 0">
      {{ articleTitle }}
    </span>
  </div>

  <div class="headings-mobile" v-if="exists(articleHeadings) && articleHeadings.length != 0">
    <Dropdown style="display: block;">
      <template #activator>
        <button class="button-full button-headings">
          <span class="material-symbols-outlined">toc</span>
          View Contents
          <span class="material-symbols-outlined">arrow_drop_down</span>
        </button>
      </template>
      <template #contents>
        <!-- <DropdownItem v-for="heading in articleHeadings">
          <a :class="`heading-level-${heading.level}`" :href="`#${heading.id}`">{{ heading.title }}</a>
        </DropdownItem> -->
        <a :href="`#${heading.id}`" v-for="heading in articleHeadings">
          <DropdownItem>
            <span :class="`heading-level-${heading.level}`">{{ heading.title }}</span>
          </DropdownItem>
        </a>
      </template>
    </Dropdown>
  </div>
</template>