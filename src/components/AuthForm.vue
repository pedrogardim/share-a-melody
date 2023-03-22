<template>
  <div class="ui container">
    <form
      class="ui form"
      @submit="submit"
    >
      <div class="field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
        />
      </div>
      <div class="field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <button
        class="ui button"
        type="submit"
        id="signUp"
      >
        Create account</button
      ><button
        class="ui button"
        type="submit"
        id="signIn"
      >
        Sign in
      </button>
    </form>
    <div
      v-if="!!errorMessage"
      class="ui error message"
    >
      <div class="header">Error</div>
      <p>
        {{ formatedErrorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'AuthForm',
  data() {
    return {
      errorMessage: null,
    };
  },
  computed: {
    formatedErrorMessage() {
      return this.errorMessage
        ?.split('_')
        .map((word) => word[0] + word.slice(1, word.length).toLowerCase())
        .join(' ');
    },
  },
  methods: {
    async submit(event) {
      event.preventDefault();
      try {
        const [email, password] = [0, 1].map((e) => event.target[e].value);
        await this[event.submitter.id]({ email, password });
      } catch (err) {
        this.errorMessage = err.response.data.error.message;
      }
      return false;
    },
    ...mapActions(['signUp', 'signIn']),
  },
};
</script>

<style></style>
