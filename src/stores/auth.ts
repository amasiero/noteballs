import { auth } from '@/infra/firebase';
import { Credentials } from '@/types/auth';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { defineStore } from 'pinia';
import { Router } from 'vue-router';

interface AuthState {
  user: null | {
    uid: string;
    email: string;
  };
  router?: Router;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
  }),
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = {
            uid: user.uid,
            email: user.email || '',
          };
          this.router?.push({ name: 'notes' });
        } else {
          this.user = null;
          this.router?.replace({ name: 'auth' });
        }
      });
    },
    register(credentials: Credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
    },
    login(credentials: Credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
    },
    logout() {
      signOut(auth).catch((error) => {
        console.error(error);
      });
    },
  },
});
