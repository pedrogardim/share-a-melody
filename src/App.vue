<template>
  <AppHeader />
  <router-view />
  <h1>Hi!</h1>
</template>

<script>
import AppHeader from './components/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>

<style>
#app {
}
</style>
