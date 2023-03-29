import { createWebHistory, createRouter } from 'vue-router';
import AuthForm from '../components/AuthForm.vue';
import MelodyEditor from '../components/MelodyEditor.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: AuthForm,
    },
    {
      path: '/editor',
      component: MelodyEditor,
    },
  ],
});

export default router;
