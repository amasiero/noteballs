import NotesView from '@/views/NotesView.vue';
import StatsView from '@/views/StatsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: NotesView,
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
    },
  ],
});
