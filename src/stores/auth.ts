import { auth } from '@/infra/firebase';
import { Credentials } from '@/types/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { defineStore } from 'pinia';

interface AuthState {}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({}),
  actions: {
    register(credentials: Credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.info(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
        });
    },
  },
});
