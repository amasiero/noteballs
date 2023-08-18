import { router } from '@/routes';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
