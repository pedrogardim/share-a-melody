<template>
  <AppHeader />
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';
import AppHeader from './components/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  methods: {
    ...mapActions(['authInit']),
  },
  mounted() {
    this.authInit();
  },
};
</script>

<style>
#app {
}
</style>
