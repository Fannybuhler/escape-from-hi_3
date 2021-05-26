<template>
  <div class="game">
    <div class="game-area">
      <button v-if="isStarted === false" 
      @click="startGame" 
      :class="{hidden : isStarted}"
      class="startButton"
      >START</button>
      <Board disabled="disabled"/>

      <div class="game-info" v-if="winner || stepNumber > 9">
        <div>
          <p v-if="winner">{{ winner ? `The winner is ${winner}!` : '' }}</p>
          <p v-if="stepNumber > 9">It's a draw!</p>
          <button v-if="winner || stepNumber > 9" 
            @click="restart">Play again</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from './Board'
import { mapState } from 'vuex'

export default {
  name: 'Game',
  components: {
    Board
  },
 
  computed: {
    ...mapState([
      'isStarted',
      'winner',
      'stepNumber'
    ])
  },

  methods: {
    startGame() {
      this.$store.commit('toggleIsStarted')
    },

    restart() {
      location.reload()
    },
  }
}
</script>

<style scoped>
.startButton {
  position: absolute;
  height: 50px;
  width: 70px;

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  
  z-index: 1;
}

.hidden {
  display: none;
}

.game {
  background-color: rgba(var(--gradient-color-base));
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.game-area {
  display: flex;
  flex-flow: column;
}

.game-info {
  margin: 3vmin 0 0;
  padding: 1rem .5rem;
  font-size: 1.25em;
  text-align: center;
  box-shadow: 2.5px 5px 25px #0001, 0 1px 6px #0004;
  text-shadow: 0 0 1px #fff, 0 2px 5px #fff5;
  border-radius: .5rem;
  backdrop-filter: blur(10px);
  background: #fff6;
  background-blend-mode: exclusion;
  color: #111;
}
.game-info p {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.game-info .X,
.game-info .O {
  text-shadow: -1px -1px 0 #000b, -1px 1px 0 #000b, 1px -1px 0 #000b, 1px 1px 0 #000b;
}
.game-info .X {
  color: #ff5722;
}
.game-info .O {
  color: #ffeb3b;
}
.game-info button {
  text-transform: uppercase;
  font-weight: 600;
  font-size: .75em;
  padding: .5rem 1rem;
  margin-top: .5rem;
  border: 2px solid #fff;
  background: #fff5;
  text-shadow: 0 0 1px #fff, 0 2px 5px #fff5;
  color: #111;
  cursor: pointer;
  outline: none;
  transition: all .25s ease;
}
.game-info button:focus,
.game-info button:hover {
  background: #1115;
  border-color: rgba(var(--theme-color));
  box-shadow: 0 0 10px rgba(var(--theme-color), .75);
  color: rgba(var(--theme-color));
  text-shadow: -1px -1px 0 #0007, -1px 1px 0 #0007, 1px -1px 0 #0007, 1px 1px 0 #0007;
}
.game-info button:active {
  background: #1119;
}
</style>