<script setup>
import "./Navbar.scss"
import { RouterLink } from "vue-router";
import { ref } from "vue";

import NavbarLink from "./NavbarLink.vue";
import NavbarDropdown from "./NavbarDropdown.vue";
import NavbarDropdownMobile from "./NavbarDropdownMobile.vue";
import NavbarDropdownMobileItem from './NavbarDropdownMobileItem.vue'

const mobileNavActive = ref(false);
</script>

<template>
  <nav id="topnav">
    <div id="topnav-wrapper">
      <div id="nav-icon-link">
        <RouterLink to="/">
          <span id="nav-icon" class="material-symbols-outlined">
            account_balance
          </span>
          <span id="nav-name">The Thought Exchange</span>
        </RouterLink>
      </div>

      <NavbarLink text="Articles" link-location="/articles" />
      <NavbarLink text="Submit" link-location="/submit" />
      <NavbarDropdown text="More">
        <NavbarLink text="Constitution" link-location="/constitution" />
        <NavbarLink text="Mission Statement" link-location="/mission" />
        <NavbarLink text="Donate" link-location="/donate" />
        <!-- <NavbarLink text="Meta" link-location="/mission" /> -->
      </NavbarDropdown>

      <NavbarDropdownMobile>
        <NavbarDropdownMobileItem text="Home" link-location="/" />
        <NavbarDropdownMobileItem text="Articles" link-location="/articles" />
        <NavbarDropdownMobileItem text="Submit" link-location="/submit" />
        <NavbarDropdownMobileItem text="Constitution" link-location="/constitution" />
        <NavbarDropdownMobileItem text="Mission Statement" link-location="/mission" />
        <NavbarDropdownMobileItem text="Donate" link-location="/donate" />
        <!--<NavbarLink text="Meta" link-location="/mission" /> -->
      </NavbarDropdownMobile>
    </div>
  </nav>
</template>