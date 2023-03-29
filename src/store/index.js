import { createStore } from 'vuex';
import auth from './modules/auth';
import gallery from './modules/gallery';

export default createStore({
  modules: {
    auth,
    gallery,
  },
});
