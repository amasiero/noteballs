import { router } from '@/routes/routes';
import { createApp } from 'vue';

import App from './App.vue';

createApp(App).use(router).mount('#app');
