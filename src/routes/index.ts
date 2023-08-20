import AuthView from '@/views/AuthView.vue';
import EditNoteView from '@/views/EditNoteView.vue';
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
      path: '/edit/:id',
      name: 'edit-note',
      component: EditNoteView,
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
  ],
});
