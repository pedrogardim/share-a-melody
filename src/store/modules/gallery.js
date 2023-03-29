import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/js/firebase';

const melodyModule = {
  state: () => ({
    items: [],
  }),
  getters: {
    getGallerytems(state) {
      return state.items;
    },
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
  },
  actions: {
    async getFeed({ commit }) {
      const querySnapshot = await getDocs(collection(db, 'melodies'));
      const docs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      commit('setItems', docs);
      console.log(docs);
    },
  },
};

export default melodyModule;
