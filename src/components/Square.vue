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
        const reverseIndex = this.reverseIndex(this.position)
        const squareValue = this.squares[reverseIndex]
        console.log('squareValue: ', squareValue)
        
        if(this.winner) {
          return
        }

        if (squareValue === null) {
          this.$store.dispatch('clickedSquare', reverseIndex)
          this.dispatchers()
          this.opponentMove()
        } else {
          return
        }
      }
    },

    reverseIndex(index) {
      let reverseIndex = null
      if (index === 0) {
        reverseIndex = 8
        console.log('recieved index: ', index)
        console.log('reversed to: ', reverseIndex)
      } else if (index === 1) {
        reverseIndex = 7
        console.log('recieved index: ', index)
        console.log('reversed to: ', reverseIndex)
      } else if (index === 2) {
        reverseIndex = 6
        console.log('recieved index: ', index)
        console.log('reversed to: ', reverseIndex)
      } else if (index === 3) {
        reverseIndex = 5
        console.log('recieved index: ', index)
        console.log('reversed to: ', reverseIndex)
      } else if (index === 4) {
        reverseIndex = 4
        console.log('recieved index: ', index)
        console.log('reversed to: ', reverseIndex)
      } else if (index === 5) {
        reverseIndex = 3
        console.log('recieved index: ', index)
        console.log('reversed to: ', reverseIndex)
      } else if (index === 6) {
        reverseIndex = 2
        console.log('recieved index: ', index)
        console.log('reversed to: ', reverseIndex)
      } else if (index === 7) {
        reverseIndex = 1
        console.log('recieved index: ', index)
        console.log('reversed to: ', reverseIndex)
      } else if (index === 8) {
        reverseIndex = 0
        console.log('recieved index: ', index)
        console.log('reversed to: ', reverseIndex)
      }
      return reverseIndex
    },

    opponentMove() {
      let arr = this.squares
      let index = Math.floor(Math.random() * arr.length)
      while ((arr[index] === 'X') || (arr[index] === 'O')) {
        index = Math.floor(Math.random() * arr.length)
        if(this.winner || this.stepNumber > 8) {
          return
        }
      }
      this.$store.dispatch('clickedSquare', index)
      this.dispatchers()
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
  color: #F42FDA;
  background: #ffffff14;
  background-blend-mode: exclusion;
  background-image: var(--noise-pattern);
  border: 1px solid #fffc;
  font-size: 15vmin;
  font-weight: bold;
  line-height: 34px;
  padding: 0;
  text-align: center;
  box-shadow: inset 0 0 0 #0004;
  /* text-shadow: -1px -1px 1px #CC0364, -1px 1px 1px #CC0364, 1px -1px 1px #CC0364, 1px 1px 1px #CC0364; */
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