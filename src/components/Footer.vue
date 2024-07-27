<script setup>
  import SimpleContentWrapper from './SimpleContentWrapper.vue';
  import { RouterLink } from 'vue-router';
</script>

<template>
  <footer>
    <simple-content-wrapper>
      <div class="footer-content">
        <div class="footer-links">
          <router-link to="/contact" class="footer-link">contact</router-link>
          <router-link to="/" class="footer-link">about</router-link>
          <router-link to="/" class="footer-link">privacy</router-link>
          <!-- privacy policy ^ -->
          <a href="/sitemap.xml" class="footer-link">site map</a>
          <router-link to="/donate" class="footer-link footer-rainbow">donate</router-link>
          <span class="footer-link">TTE &copy;{{ new Date().getFullYear() }}</span>
        </div>
        <div class="footer-links-svg">
          <a target="_blank" aria-label="instagram" class="footer-link footer-svg-instagram" href="https://www.instagram.com/thoughtexchange_/"></a>
        </div>
      </div>
    </simple-content-wrapper>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/sf-scss/colors";
@import "@/sf-scss/responsive";

footer {
  background: $lgrey-2;
  margin-top: 25px;
  padding: 10px;

  .footer-content {
    .footer-links {
      display: flex;
      flex-flow: wrap;
      justify-content: center;
      margin-bottom: 10px; // should be the same as padding from above

      .footer-link {
        padding: 0 15px;
        font-size: 0.9rem;
        @include responsive(2) { padding: 0 12px; }
        @include responsive(1) { padding: 0 10px; }

        color: var(--color-fg);

        &.footer-rainbow {
          background-image: linear-gradient(135deg, violet, $indigo, $blue, $green, $yellow, $orange, $red);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
        }
      }
    }

    .footer-links-svg {
      display: flex;
      flex-flow: wrap;
      justify-content: center;

      .footer-link {
        padding: 15px; // sizing of icons

        &.footer-svg-instagram {
          background: url('/svg/instagram.svg') no-repeat center;
        }
      }
    }
  }
}
</style>