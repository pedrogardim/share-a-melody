import { createWebHistory, createRouter } from 'vue-router';
import AuthForm from '../components/AuthForm.vue';
import MelodyEditor from '../components/MelodyEditor.vue';
import MelodyGallery from '../components/MelodyGallery.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MelodyGallery,
    },
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
