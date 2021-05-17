import { createStore } from "vuex";

export default createStore({
  state: {
    clickedSquares: []
  },

  getters: {
    getClickedSquares: state => {
      return state.clickedSquares
    }
  },

  actions: {
    clickedSquare (context, payload1, payload2) {
      context.commit('pushClickedSquare', payload1, payload2)
    }
  },

  mutations: {
    pushClickedSquare (state, payload1, payload2) {
      console.log(state, payload1, payload2)
      // state.clickedSquares.push(payload1, payload2)
      // console.log(state.clickedSquares)
    }
  }
})