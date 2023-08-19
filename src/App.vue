<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<style>
  @import 'bulma/css/bulma.min.css';
</style>
