<template>
  <div class="ui card">
    <div class="image">
      <img
        src="https://blog.landr.com/wp-content/uploads/2016/11/What-is-Midi_700x340-pianorollB.gif"
      />
    </div>
    <div class="content">
      <i class="right floated like icon"></i>
      <a class="header">{{ data.name || 'Some melody' }}</a>
      <div class="meta">
        <span class="date">{{ data.id }}</span>
      </div>
      <div class="description">
        Kristy is an art director living in New York.
      </div>
    </div>
    <div class="extra content">
      <a
        class="right floated"
        @click.prevent="onCardPlay"
      >
        Play
        <i class="play icon"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { playMelody } from '@/services/melody';

export default {
  name: 'MelodyCard',
  data() {
    return {
      notes: [],
    };
  },
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    onCardPlay() {
      playMelody(this.data);
    },
  },
};
</script>
