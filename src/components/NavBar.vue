<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';

  const showMobileNavBar = ref(false);
  const navbarMenuRef = ref<HTMLElement | null>(null);
  const navbarBurgerRef = ref<HTMLElement | null>(null);

  onClickOutside(
    navbarMenuRef,
    () => {
      showMobileNavBar.value = false;
    },
    {
      ignore: [navbarBurgerRef],
    },
  );
</script>

<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <span class="navbar-item is-size-4 is-family-secondary"> Noteballs </span>

        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNavBar }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          @click.prevent="showMobileNavBar = !showMobileNavBar"
          ref="navbarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarMenu" class="navbar-menu" :class="{ 'is-active': showMobileNavBar }" ref="navbarMenuRef">
        <div class="navbar-start">
          <a class="navbar-item is-size-6 is-align-self-center has-text-info has-text-weight-medium" @click.prevent="showMobileNavBar = !showMobileNavBar">Log out</a>
        </div>
        <div class="navbar-end">
          <RouterLink
            to="/"
            class="navbar-item"
            active-class="is-active"
            @click.prevent="showMobileNavBar = !showMobileNavBar"
            >Notes</RouterLink
          >
          <hr class="navbar-divider" />
          <RouterLink
            to="/stats"
            class="navbar-item"
            active-class="is-active"
            @click.prevent="showMobileNavBar = !showMobileNavBar"
            >Stats</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  @media (max-width: 1023px) {
    .navbar-menu {
      position: absolute;
      left: 0;
      width: 100%;
    }
  }
</style>
