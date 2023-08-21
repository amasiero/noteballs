<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue';
  import { useAuthStore } from '@/stores';
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.init();
  });
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
