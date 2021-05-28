<template>
  <button class="square" @click="fillSquare">{{ value }}</button>
</template>

<script>
import { mapGetters, mapState} from 'vuex'

export default {
  name: 'Square',
  props: {
    position: Number,
    value: String
  },

  computed: {
    ...mapState([
      'isStarted'
    ]),
    ...mapGetters({
      squares: 'getSquares',
      currentPlayer: 'getCurrentPlayer',
      stepNumber: 'getStepNumber',
      winner: 'getWinner',
    }),
  },

  methods: {
    fillSquare() {
      if(this.isStarted && this.currentPlayer === 'X') {
        const squareValue = this.squares[this.position]

        if(this.winner) {
          return
        }

        if (squareValue === null) {
          this.$store.dispatch('clickedSquare', this.position)
          this.dispatchers()
        }

        this.opponentMove()
        return
      }
    },

    opponentMove() {
      let arr = this.squares
      let index = Math.floor(Math.random() * arr.length)
      while ((arr[index] === 'X') || (arr[index] === 'O')) {
        index = Math.floor(Math.random() * arr.length)
        console.log('Picked random index: ', index)
        if(this.winner || this.stepNumber > 8) {
          return
        }
      }
      this.$store.dispatch('clickedSquare', index)
      this.dispatchers()
      console.log('filled index: ', index, 'with O')
    },
 
    dispatchers() {
      this.$store.dispatch('increaseStepNumber')
      this.$store.dispatch('calculateWinner')
      this.$store.dispatch('flipCurrentPlayer')
    }
  }
}
</script>

<style scoped>
.square {
  background: #fff9;
  background-blend-mode: exclusion;
  background-image: var(--noise-pattern);
  border: 1px solid #fffc;
  font-size: 15vmin;
  font-weight: bold;
  line-height: 34px;
  padding: 0;
  text-align: center;
  box-shadow: inset 0 0 0 #0004;
  text-shadow: -1px -1px 1px #000b, -1px 1px 1px #000b, 1px -1px 1px #000b, 1px 1px 1px #000b;
  transition: all .25s ease;
  outline: none;
}
.square.winner {
  background: #8885;
}
.square:not([disabled]):empty:hover,
.square:not([disabled]):empty:focus {
  box-shadow: inset 0 2px 25px #0006;
  cursor: pointer;
}
.square:not([disabled]):empty:active {
  box-shadow: inset 0 2px 50px #0008;
}
</style>