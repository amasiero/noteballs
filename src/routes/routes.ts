import NotesView from '@/views/NotesView.vue';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'notes', component: NotesView }],
});
