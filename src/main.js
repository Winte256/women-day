import { createApp } from 'vue';
import Toast from 'vue-toastification';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(store).use(Toast, {}).use(router);

app.mount('#app');
