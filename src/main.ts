import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';

import ToastService from 'primevue/toastservice';

import "primevue/resources/themes/lara-light-indigo/theme.css";
import "./global.css";

const app = createApp(App)

app.use(ToastService);
app.use(PrimeVue);
app.use(router)

app.mount('#app')
