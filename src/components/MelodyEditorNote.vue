<template>
  <div
    class="note"
    :class="drawingNote && 'drawing-note'"
    :style="{
      top: getNoteTop,
      width: getNoteWidth,
      left: getNoteLeft,
    }"
    @click="onNoteClick"
  ></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { timeToPixels } from '@/services/editor';

export default {
  name: 'MelodyEditor',
  props: {
    note: { type: Object },
  },
  data: () => ({
    width: 0,
    left: 0,
  }),
  computed: {
    getNoteTop() {
      return (this.getParameters.noteRange[1] - this.note.note) * 30 + 'px';
    },
    getNoteLeft() {
      return timeToPixels(this.note.time, this.$parent.$el) + 'px';
    },
    getNoteWidth() {
      return timeToPixels(this.note.duration, this.$parent.$el) + 'px';
    },
    ...mapGetters(['getParameters']),
  },
  methods: {
    onNoteClick() {
      this.removeNote(this.note);
    },
    ...mapActions(['removeNote']),
  },
};
</script>

<style>
.note {
  position: absolute;
  height: 20px;
  background-color: rgb(141, 187, 63);
  margin-top: -25px;
  border-radius: 16px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.39);
}
.drawing-note {
  background-color: rgba(141, 187, 63, 0.62);
  pointer-events: none;
}
</style>
