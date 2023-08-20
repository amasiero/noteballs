<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';

  const register = ref(false);
  const formTitle = computed(() => (register.value ? 'Register' : 'Sign in'));

  const credentials = reactive({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    console.log(credentials);
  };
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
      <form class="content" @submit.prevent="onSubmit">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input v-model="credentials.email" class="input" type="email" placeholder="e.g. johnwick@gmail.com" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input v-model="credentials.password" class="input" type="password" placeholder="enter your password" />
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <button class="button is-primary">
              {{ formTitle }}
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .auth-form {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
