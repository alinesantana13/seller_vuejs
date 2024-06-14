import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import VueAwesomePaginate from '../node_modules/vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';

import App from './App.vue'
import router from './router'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAwesomePaginate);

app.mount('#app');
