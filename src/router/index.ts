import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { Auth, Dashboard, Transaction } from '../views';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/transacao/:transactionType',
    name: 'Transaction',
    component: Transaction,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
