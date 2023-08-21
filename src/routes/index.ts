import { useAuthStore } from '@/stores';
import AuthView from '@/views/AuthView.vue';
import EditNoteView from '@/views/EditNoteView.vue';
import NotesView from '@/views/NotesView.vue';
import StatsView from '@/views/StatsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  if (!authStore.user && to.name !== 'auth') {
    return { name: 'auth' };
  }

  if (authStore.user && to.name === 'auth') {
    return false;
  }
});

export { router };
