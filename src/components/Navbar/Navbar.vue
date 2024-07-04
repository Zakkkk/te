<script setup>
  import "./Navbar.scss"
  import { RouterLink } from "vue-router";
  import { ref, watchEffect, onMounted, TransitionGroup } from "vue";
  import NavbarLink from "./NavbarLink.vue";
  import NavbarDropdown from "./NavbarDropdown.vue";
  import NavbarDropdownMobile from "./NavbarDropdownMobile.vue";

  const topnav = ref(null);
  const topnavHeight = ref(53);
  const mobileNavActive = ref(false);

  const { isMobile } = defineProps({
    isMobile: false
  })

  const emit = defineEmits(['update-mobile-offset']);

  watchEffect(() => {
    if (topnav.value) {
      topnavHeight.value = topnav.value.clientHeight+1; // +1 for the border
      emit('update-mobile-offset', topnavHeight.value);
    }
  })

  onMounted(() => {
    window.addEventListener("resize", e => {
      try {
        emit('update-mobile-offset', topnav.value.clientHeight);
      } catch (error) {
        emit('update-mobile-offset', topnavHeight.value);
      }
    });
  });
</script>

<template>
  <nav id="topnav" ref="topnav">
    <div id="topnav-wrapper">
      <div id="nav-icon-link">
        <RouterLink to="/">
          <span id="nav-icon" class="material-symbols-outlined">
            account_balance
          </span>
          <span id="nav-name">The Thought Exchange</span>
        </RouterLink>
      </div>

      <NavbarLink v-if="!isMobile" text="Articles" link-location="/articles" />
      <NavbarLink v-if="!isMobile" text="Submit" link-location="/submit" />
      <NavbarDropdown v-if="!isMobile" text="More">
        <NavbarLink text="Constitution" link-location="/constitution" />
        <NavbarLink text="Mission Statement" link-location="/mission" />
        <NavbarLink text="Donate" link-location="/mission" />
        <NavbarLink text="Meta" link-location="/mission" />
      </NavbarDropdown>

      <NavbarDropdownMobile v-if="isMobile" :nav-height="topnavHeight" :mobile-nav-active="mobileNavActive">
        <NavbarLink text="Articles" link-location="/articles" />
        <NavbarLink text="Submit" link-location="/submit" />
        <NavbarLink text="Constitution" link-location="/constitution" />
        <NavbarLink text="Mission Statement" link-location="/mission" />
        <!-- <NavbarLink text="Donate" link-location="/mission" />
        <NavbarLink text="Meta" link-location="/mission" /> -->
      </NavbarDropdownMobile>
    </div>
  </nav>
</template>