import { createWebHistory, createRouter } from 'vue-router';
import AuthForm from '../components/AuthForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: AuthForm,
    },
  ],
});

export default router;
