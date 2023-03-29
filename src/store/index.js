import { createStore } from 'vuex';
import auth from './modules/auth';
import gallery from './modules/gallery';
import editor from './modules/editor';

export default createStore({
  modules: {
    auth,
    gallery,
    editor,
  },
});
