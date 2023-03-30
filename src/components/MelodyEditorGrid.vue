<template>
  <div
    class="ui container editor"
    @mousedown="isMouseDown = true"
    @mouseup="isMouseDown = false"
    @mouseleave="isMouseDown = false"
  >
    <MelodyEditorNote
      v-for="note in getNotes"
      :key="note.time + note.note"
      :note="note"
    />
    <MelodyEditorNote
      drawingNote
      v-if="getDrawingNote"
      :note="getDrawingNote"
    />
    <div
      v-for="row in getParameters.noteRange[1] - getParameters.noteRange[0]"
      :key="row"
      class="seq-row"
    >
      <span class="row-note-label">{{ getRowNote(row) }}</span>
      <div
        v-for="col in getTotalColumns"
        :key="col"
        :class="`seq-tile ${
          (col - 1) % getParameters.grid === 0 ? 'accent-col' : ''
        }
        ${cursorPos === col - 1 && isPlaying ? 'cursor-col' : ''}`"
        @mouseenter="() => onTileHover(col - 1, row - 1)"
        @mousedown="() => onTileMouseDown(col - 1, row - 1)"
      >
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MelodyEditorNote from './MelodyEditorNote.vue';
import * as Tone from 'tone';
import { FMSynth } from '@/js/tone';

export default {
  name: 'MelodyEditorGrid',
  data: () => ({
    isMouseDown: false,
    lastClickedPos: [0, 0],
    cursorPos: 0,
    columnInterval: null,
  }),
  props: { isPlaying: { type: Boolean } },
  watch: {
    isMouseDown(isDown) {
      if (!isDown) {
        this.saveNewNote().then(this.scheduleMelody);
      }
    },
  },

  mounted() {
    this.columnInterval = setInterval(() => {
      let newPos = Math.floor(Tone.Transport.progress * this.getTotalColumns);
      if (this.cursorPos !== newPos) this.cursorPos = newPos;
    }, 17);
  },
  unmounted() {
    clearInterval(this.columnInterval);
  },
  computed: {
    ...mapGetters(['getParameters', 'getDrawingNote', 'getNotes']),
    getTotalColumns() {
      return (
        (this.getParameters.measureRange[1] -
          this.getParameters.measureRange[0] +
          1) *
        this.getParameters.grid
      );
    },
  },
  methods: {
    getRowNote(midiNote) {
      return Tone.Frequency(
        this.getParameters.noteRange[1] - midiNote,
        'midi'
      ).toNote();
    },
    randomNumber(range) {
      return Math.floor(Math.random() * range);
    },
    onTileHover(x) {
      if (this.isMouseDown) {
        this.onEditorDrag({ x, lastClickedPos: this.lastClickedPos });
      }
    },
    onTileMouseDown(x, y) {
      this.lastClickedPos = [x, y];
      this.onEditorMouseDown([x, y]);
      FMSynth.triggerAttackRelease(
        Tone.Frequency(
          this.getParameters.noteRange[1] - (this.lastClickedPos[1] + 1),
          'midi'
        ),
        '8n'
      );
    },
    ...mapActions([
      'onEditorDrag',
      'onEditorMouseDown',
      'saveNewNote',
      'scheduleMelody',
    ]),
  },
  components: { MelodyEditorNote },
};
</script>

<style>
.editor {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
}
.seq-row {
  width: 100%;
  height: 30px;
  display: flex;
}
.seq-tile {
  /* border: 1px solid rgb(184, 184, 184); */
  flex: 1 1 30px;
  margin: -1px -1px 0px 0px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.seq-tile > div {
  height: 8px;
  width: 8px;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.32);
  transition: height width 0.3s;
}

.seq-tile:hover {
  /* background-color: rgba(0, 0, 0, 0.159); */
}

.seq-tile:hover > div {
  height: 12px;
  width: 12px;
}
.accent-col {
  border-left: 1px solid rgb(40, 40, 40);
}
.cursor-col > div {
  background-color: rgba(0, 0, 0, 0.5);
}
.row-note-label {
  position: absolute;
  left: -36px;
  text-align: right;
  width: 32px;
  line-height: 30px;
  font-size: 12px;
  color: rgb(112, 112, 112);
}
</style>
