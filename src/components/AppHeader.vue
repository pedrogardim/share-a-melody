<template>
  <div class="ui secondary pointing menu">
    <router-link
      to="/"
      class="item"
    >
      <h3>Share A Melody</h3>
    </router-link>
    <router-link
      v-if="isUserLoggedIn"
      class="item"
      to="/editor"
    >
      Create melody
    </router-link>

    <div
      v-if="!isUserLoggedIn"
      class="right menu"
    >
      <router-link
        class="item"
        to="/login"
      >
        Sign In
      </router-link>
    </div>
    <div
      v-else
      @click="logout"
      class="right menu"
    >
      <a class="item">
        <div
          v-html="generateAvatar"
          class="avatar"
        ></div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toSvg as generateIdenticon } from 'jdenticon';

export default {
  name: 'AppHeader',
  computed: {
    generateAvatar() {
      return generateIdenticon(this.getUser.uid, 40);
    },
    ...mapGetters(['getUser', 'isUserLoggedIn']),
  },
  methods: {
    ...mapActions(['authInit', 'logout']),
  },
};
</script>

<style>
.avatar {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
  border-radius: 100%;
  height: 32px;
  width: 32px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
