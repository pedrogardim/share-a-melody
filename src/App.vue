<template>
  <AppHeader />
  <div class="ui container">
    <RouterView />
  </div>
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
