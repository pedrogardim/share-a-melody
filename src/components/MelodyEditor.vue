<template>
  <div class="ui container">
    <div
      v-for="row in Array(8).map((e, i) => i)"
      :key="row"
      class="seq-row"
    >
      <div
        v-for="col in Array(32)
          .fill(0)
          .map((e, i) => i)"
        :key="col"
        :class="`seq-tile ${col % 8 === 0 ? 'accent-col' : ''}`"
        @click="($e) => onTileClick(row, col)"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'MelodyEditor',
  data() {
    return {
      notes: [],
    };
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    onTileClick() {},
  },
};
</script>

<style>
.seq-row {
  width: 100%;
  height: 30px;
  display: flex;
}
.seq-tile {
  border: 1px solid rgb(184, 184, 184);
  flex: 1 1 30px;
  margin: -1px -1px 0px 0px;
  transition: all 0.2s;
}

.seq-tile:hover {
  background-color: rgba(0, 0, 0, 0.159);
}
.accent-col {
  border-left: 1px solid rgb(40, 40, 40);
}
</style>
