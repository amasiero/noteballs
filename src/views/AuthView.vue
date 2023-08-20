<script setup lang="ts">
  import { computed, ref } from 'vue';

  const register = ref(false);
  const formTitle = computed(() => (register.value ? 'Register' : 'Sign in'));
</script>

<template>
  <div class="tabs is-centered">
    <ul>
      <li :class="{ 'is-active': !register }"><a @click.prevent="register = false">Sign in</a></li>
      <li :class="{ 'is-active': register }"><a @click.prevent="register = true">Register</a></li>
    </ul>
  </div>
  <div class="card auth-form">
    <div class="card-content">
      <div class="title has-text-centered">
        {{ formTitle }}
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<style scoped>
  .auth-form {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
