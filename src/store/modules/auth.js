import axios from 'axios';

const apiKey = process.env.VUE_APP_FB_API_KEY;
const baseURL = process.env.VUE_APP_AUTH_API_BASE_URL;

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
    logout({ commit }) {
      commit('setUser', null);
      localStorage.removeItem('user');
    },
    async signUp({ commit }, formData) {
      const response = await axios.post(
        `${baseURL}accounts:signUp?key=${apiKey}`,
        { ...formData, returnSecureToken: true }
      );
      console.log(response);
      commit('setUser', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    },
    async signIn({ commit }, formData) {
      const response = await axios.post(
        `${baseURL}accounts:signInWithPassword?key=${apiKey}`,
        { ...formData, returnSecureToken: true }
      );
      commit('setUser', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    },
    async tryToLoginWithStoredToken({ commit }) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post(`${baseURL}token?key=${apiKey}`, {
        storedUser,
      });
      commit('setUser', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    },
  },
};

export default authModule;
