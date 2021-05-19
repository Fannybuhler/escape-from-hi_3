import { createStore } from "vuex";

export default createStore({
  state: {
    squares: Array(9).fill(null),
    stepNumber: 0,
    currentPlayer: 'X',
    // winner: null,
    clickedSquares: []
  },

  getters: {
    getSquares: state => state.squares,
    getStepNumber: state => state.stepNumber,
    getCurrentPlayer: state => state.currentPlayer,
    // getWinner: state => state.winner,
    getClickedSquares: state => state.clickedSquares,
  },

  actions: {
    clickedSquare (context, index) {
      context.commit('pushClickedSquare', index)
    },

    flipCurrentPlayer(context) {
      context.commit('setCurrentPlayer')
    }
  },

  mutations: {
    pushClickedSquare (state, index) {
      state.squares.splice(index, 1, state.currentPlayer)
      console.log(state.squares)
    },

    setCurrentPlayer(state) {
      state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X'
      console.log('current player is: ', state.currentPlayer)
    }
  }
})