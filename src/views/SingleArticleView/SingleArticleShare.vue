<script setup>
import Popper from "vue3-popper";

import { ref } from "vue";
import copyTextToClipboard from '@/util/clipboard.js';

const props = defineProps({
  articleTitle: String,
  authorName: String
});

const shareLinkPopper = ref(false);

const handlePopperClick = () => {
  copyTextToClipboard(window.location.href);
  shareLinkPopper.value = true;
  setTimeout(() => {
    shareLinkPopper.value = false;
  }, 1500);
}

const shareTwitter = () => {
  const tweetText = encodeURIComponent(`
    ${props.articleTitle} written by ${props.authorName}: ${window.location.href}
  `.trim());
  const twitterURL = `https://twitter.com/intent/tweet?text=${tweetText}`;

  window.open(twitterURL, '_blank');
}
</script>

<style lang="scss">
@import "@/sf-scss/responsive";
@import "@/sf-scss/variables";

.article-share-wrapper {
  // border: 1px solid red;
  position: sticky;
  top: 0;
  height: 100vh;
  align-self: start;

  .article-share {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    padding-right:5px;
    justify-content: center;
    gap: 30px;

    .article-share-link {
      // https://www.iconfinder.com/social-media-icons

      cursor: pointer;
      height: 40px;
      display: flex;
      align-items: center;
      // opacity: 0.4;
      filter: saturate(20%);
      @include responsive(1) { filter: saturate(100%); }
      transition: filter $sf-transition;

      // Popper styles
      --popper-theme-background-color: rgba(51,51,51,51);
      --popper-theme-text-color: var(--color-bg);
      --popper-theme-border-radius: 2px;
      --popper-theme-padding: 0 6px;

      &:hover {
        opacity: 1;
        filter: saturate(100%);
        transition: filter $sf-transition;
      }

      .article-share-link-instagram {
        background: url('/svg/instagram_color.svg') no-repeat center;
        padding: 15px;
      }

      .article-share-link-twitter {
        background: url('/svg/twitter.svg') no-repeat center;
        padding: 15px;
      }

      .article-share-link-facebook {
        background: url('/svg/facebook.svg') no-repeat center;
        padding: 15px;
      }
    }
  }

  @include responsive(1) {
    position: static;
    flex-direction: row;
    align-self: auto;
    height: inherit;
    padding-top: 35px;

    .article-share {
      flex-direction: row;
    }
  }
}

</style>

<template>
  <div class="article-share-wrapper">
    <div class="article-share">
      <div class="article-share-link">
        <Popper 
          content="Copied!" 
          arrow 
          placement="top" 
          @click="handlePopperClick"
          :show="shareLinkPopper">

          <span class="material-symbols-outlined">share</span>
        </Popper>
      </div>
      <!-- <div class="article-share-link">
        <span class="article-share-link-instagram"></span>
      </div> -->
      <div class="article-share-link" @click="shareTwitter">
        <span class="article-share-link-twitter"></span>
      </div>
      <!-- <div class="article-share-link" @click="shareFacebook">
        <span class="article-share-link-facebook"></span>
      </div> -->
    </div>
  </div>
</template>