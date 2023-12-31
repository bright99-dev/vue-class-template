import { createWebHistory, createRouter } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import authRoutes from '@/router/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/tutorials',
    name: 'tutorials',
    component: () => import('@/views/PostView.vue'),
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
