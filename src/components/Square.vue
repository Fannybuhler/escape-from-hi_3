<template>
  <button class="square" @click="fillSquare">{{ value }}</button>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
  name: 'Square',
  props: {
    position: Number,
  },

  data() {
    return {
      value: null,
    }
  },

  computed: {
    ...mapGetters({
      square: 'getSquares',
      currentPlayer: 'getCurrentPlayer',
      stepNumber: 'getStepNumber',
      winner: 'getWinner'
    }),
  },

  mounted() {
    this.opponentMove()
  },

  methods: {
    fillSquare() {
      const squareValue = this.square[this.position]

      if(this.winner) {
        return
      }

      if (squareValue === null) {
        this.value = this.currentPlayer
        this.$store.dispatch('clickedSquare', this.position)
        this.dispatchers()
      }

      // if(this.currentPlayer === 'O') {
      //   this.opponentMove()
      // }
      return
    },

    // opponentMove() {
    //   let arr = this.square
    //   let arr_null = []
    //   let null_counter = 0

    //   if (this.currentPlayer === 'O') {
    //     for(let i = 0; i < arr.length; i++) {
    //       const val = arr[i]
    //       if (val === null) {
    //         arr_null[null_counter] = i
    //         null_counter++
    //       }
    //     }
    //     console.log('store array: ', arr)
    //     console.log('null array: ', arr_null)
    //     arr_null = arr_null.sort(() => Math.random() - 0.5)

    //     this.pushOpponentMove(arr)

    //   }
    // },

        // let index = Math.floor(Math.random() * arr.length)
        // while (arr[index] !== null) {
        //   index = Math.floor(Math.random() * arr.length)
        //   console.log('Picked random index: ', index)
          
        //   if (arr[index] === null) {
        //     this.value = this.currentPlayer
        //     console.log('value: ', this.value)
        //     this.$store.dispatch('clickedSquare', index)
        //     this.dispatchers()
        //     return
        //   } 

    /* 
      IF (player turn === 'O') {
        Loop over Array and look for null values
        Get index of null values
        Randomly pick one of the indexes
        Place O
      }
      
    */

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
.square.X {
  color: #ff5722;
}
.square.O {
  color: #ffeb3b;
}
</style>