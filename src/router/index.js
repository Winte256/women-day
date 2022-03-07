import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/your-gift',
    name: 'YourGift',
    component: () => import('@/views/YourGiftView.vue'),
  },
  {
    path: '/how-to-attach',
    name: 'HowTo',
    component: () => import('@/views/HowToAttachView.vue'),
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import('@/views/SuccessView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
