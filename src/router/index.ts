import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Auth from '../views/Auth.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
