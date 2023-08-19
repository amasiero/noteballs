<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <NavBar />
  <Suspense>
    <template #default>
      <div class="container is-max-desktop px-2 py-4">
        <RouterView />
      </div>
    </template>
    <template #fallback>
      <progress class="progress is-success" value="60" max="100" />
    </template>
  </Suspense>
</template>

<style>
  @import 'bulma/css/bulma.min.css';
</style>
