import router from '../../router';

import { auth } from '@/js/firebase';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const authModule = {
  state: () => ({ user: null }),
  getters: {
    isUserLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
  },
  actions: {
    authInit({ commit }) {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        commit('setUser', user);
        if (user) {
          router.push('/');
        }
      });
    },
    logout() {
      signOut(auth);
    },
    async signUp(_, formData) {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
    },
    async signIn(_, formData) {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
    },
  },
};

export default authModule;
