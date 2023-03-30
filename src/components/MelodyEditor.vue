<template>
  <div class="ui container">
    <div>
      <div class="ui input">
        <input
          type="text"
          placeholder="Insert some name..."
        />
      </div>
    </div>
    <MelodyEditorGrid :isPlaying="isPlaying" />
    <button
      class="ui icon button"
      @click="playStop"
    >
      <i :class="`${isPlaying ? 'stop' : 'play'} icon`"></i>
    </button>
  </div>
</template>

<script>
import * as Tone from 'tone';
import MelodyEditorGrid from './MelodyEditorGrid.vue';

export default {
  name: 'MelodyEditor',
  components: { MelodyEditorGrid },
  data: () => ({
    isPlaying: false,
  }),
  methods: {
    handleKeyEvents({ code }) {
      if (code === 'Space') {
        this.playStop();
      }
    },
    playStop() {
      Tone.Transport.toggle();
      this.isPlaying = !this.isPlaying;
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyEvents);
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKeyEvents);
  },
};
</script>

<style scoped>
.ui.input {
  margin: 8px 0;
}
</style>
