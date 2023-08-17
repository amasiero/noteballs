<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const showMobileNavBar = ref(false);
</script>

<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <span class="navbar-item is-size-4 is-family-secondary">
          Noteballs
        </span>

        <a role="button" class="navbar-burger" :class="{'is-active': showMobileNavBar}" aria-label="menu" aria-expanded="false" data-target="navbarMenu" @click.prevent="showMobileNavBar = !showMobileNavBar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      </div>
      <div id="navbarMenu" class="navbar-menu" :class="{'is-active': showMobileNavBar}">
        <div class="navbar-end">
          <RouterLink to="/" class="navbar-item" active-class="is-active">Notes</RouterLink>
          <hr class="navbar-divider" />
          <RouterLink to="/stats" class="navbar-item" active-class="is-active">Stats</RouterLink>
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
