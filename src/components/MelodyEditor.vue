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
    <MelodyEditorGrid />
    <button class="ui icon button">
      <i class="play icon"></i>
    </button>
  </div>
</template>

<script>
import MelodyEditorGrid from './MelodyEditorGrid.vue';

export default {
  name: 'MelodyEditor',
  components: { MelodyEditorGrid },
};
</script>

<style scoped>
.ui.input {
  margin: 8px 0;
}
</style>
