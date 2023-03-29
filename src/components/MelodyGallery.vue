<template>
  <div class="ui three cards">
    <MelodyCard
      v-for="item in getGallerytems"
      :key="item.id"
      :data="item"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MelodyCard from '@/components/MelodyCard.vue';

export default {
  name: 'MelodyGallery',
  components: { MelodyCard },
  data() {},
  computed: {
    ...mapGetters(['getGallerytems']),
  },
  methods: {
    onTileClick() {},
    ...mapActions(['getFeed']),
  },
  mounted() {
    this.getFeed();
  },
};
</script>

<style>
.gallery-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 8px;
  row-gap: 8px;
  flex-direction: row;
}
</style>
