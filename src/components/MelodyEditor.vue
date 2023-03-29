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
      <!-- <span class="row-note-label">{{ getRowNote(row) }}</span> -->
      <div
        v-for="col in (getParameters.measureRange[1] -
          getParameters.measureRange[0] +
          1) *
        getParameters.grid"
        :key="col"
        :class="`seq-tile ${
          (col - 1) % getParameters.grid === 0 ? 'accent-col' : ''
        }`"
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

export default {
  name: 'MelodyEditor',
  watch: {
    isMouseDown(isDown) {
      if (!isDown) {
        this.saveNewNote();
      }
    },
  },
  data: () => ({
    isMouseDown: false,
    lastClickedPos: [0, 0],
  }),
  computed: {
    ...mapGetters(['getParameters', 'getDrawingNote', 'getNotes']),
  },
  methods: {
    getRowNote(midiNote) {
      return Tone.Frequency(
        midiNote + this.getParameters.noteRange[0] - 1,
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
    },

    ...mapActions(['onEditorDrag', 'onEditorMouseDown', 'saveNewNote']),
  },
  components: { MelodyEditorNote },
};
</script>

<style>
.editor {
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
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
  transition: all 0.3s;
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
.row-note-label {
  position: absolute;
}
</style>
