import * as Tone from 'tone';

const editorModule = {
  state: () => ({
    drawingNote: null,
    parameters: {
      noteRange: [50, 70],
      measureRange: [0, 3],
      grid: 8,
    },
    notes: [],
  }),
  getters: {
    getNotes: (state) => state.notes,
    getDrawingNote: (state) => state.drawingNote,
    getParameters: (state) => state.parameters,
  },
  mutations: {
    setDrawingNote(state, data) {
      state.drawingNote = data;
    },
    addNote(state) {
      if (
        !state.drawingNote.duration.includes('-') &&
        !state.drawingNote.time.includes('-')
      )
        state.notes.push(state.drawingNote);

      state.drawingNote = null;
    },
    removeNote(state, note) {
      state.notes = state.notes.filter(
        (n) =>
          n.time !== note.time ||
          n.note !== note.note ||
          n.duration !== note.duration
      );
    },
  },
  actions: {
    onEditorDrag({ commit, state }, { x, lastClickedPos }) {
      let drawingNote = {
        note: state.parameters.noteRange[1] - (lastClickedPos[1] + 1),
        duration: Tone.Time(
          ((x + 1 - lastClickedPos[0]) * Tone.Time('1m').toSeconds()) /
            state.parameters.grid
        ).toBarsBeatsSixteenths(),
        time: Tone.Time(
          (lastClickedPos[0] * Tone.Time('1m').toSeconds()) /
            state.parameters.grid
        ).toBarsBeatsSixteenths(),
      };
      commit('setDrawingNote', drawingNote);
    },
    onEditorMouseDown({ commit, state }, lastClickedPos) {
      let drawingNote = {
        note: state.parameters.noteRange[1] - (lastClickedPos[1] + 1),
        duration: Tone.Time(
          Tone.Time('1m').toSeconds() / state.parameters.grid
        ).toBarsBeatsSixteenths(),
        time: Tone.Time(
          (lastClickedPos[0] * Tone.Time('1m').toSeconds()) /
            state.parameters.grid
        ).toBarsBeatsSixteenths(),
      };
      commit('setDrawingNote', drawingNote);
    },
    saveNewNote({ commit }) {
      commit('addNote');
    },
    removeNote({ commit }, note) {
      commit('removeNote', note);
    },
  },
};

export default editorModule;
