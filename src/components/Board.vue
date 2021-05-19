<template>
  <div class="board">
    <Square v-for="(square, position) in squares" :key="square"
      :position="position"
      @click="flipCurrentPlayer"
    />
  </div>
</template>

<script>
import Square from './Square'
import { mapGetters } from 'vuex'

export default {
  name: 'Board',
  props: {
    // currentPlayer: String
  },

  computed: {
    ...mapGetters({
      squares: 'getSquares',
      // currentPlayer: 'getCurrentPlayer',
      // clickedSquares: 'getClickedSquares',
    })
  },

  components: {
    Square
  },

  methods: {
    flipCurrentPlayer() {
      this.$store.dispatch('flipCurrentPlayer')
    }
  }
}
</script>

<style scoped>
.board {
  border: 1rem solid #fff4;
  box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
  border-radius: .5rem;
  width: 65vmin;
  height: 65vmin;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  backdrop-filter: blur(10px);
  background-blend-mode: exclusion;
  background-image: var(--noise-pattern);
}
.board-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
}
</style>