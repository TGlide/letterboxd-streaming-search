import Vue from "vue"
import Vuex from "vuex"

import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
  },
  mutations: {
    updateMovies(state, movies) {
      this.state.movies = movies
    },
    updateMovie(state, { movieIndex, newMovie }) {
      this.state.movies = [
        ...this.state.movies.slice(0, movieIndex),
        newMovie,
        ...this.state.movies.slice(movieIndex + 1),
      ]
    },
  },
  actions: {
    getMoviesFromWatchlist({ commit }, username) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_LETTERBOXD_API_URL}/movie/watchlist/${username}`
          )
          .then(res => {
            if (
              res.status == 200 &&
              res.data.data &&
              res.data.data.movies &&
              res.data.data.movies.length > 0
            ) {
              commit(
                "updateMovies",
                res.data.data.movies.map(m => {
                  return {
                    name: m,
                    loading: true,
                    onNetflix: undefined,
                    poster: undefined,
                  }
                })
              )
              resolve({ success: true })
            }
            reject({
              success: false,
              reason: `Returned ${res.status} code.\nResponse Contents: ${res.data}`,
            })
          })
          .catch(err => {
            reject({ success: false, reason: err })
          })
      })
    },

    getMoviesFromList({ commit }, { username, listName }) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_LETTERBOXD_API_URL}/movie/list/${username}/${listName}`
          )
          .then(res => {
            if (
              res.status == 200 &&
              res.data.data &&
              res.data.data.movies &&
              res.data.data.movies.length > 0
            ) {
              commit(
                "updateMovies",
                res.data.data.movies.map(m => {
                  return {
                    name: m,
                    loading: true,
                    onNetflix: undefined,
                    poster: undefined,
                  }
                })
              )
              resolve({ success: true })
            }
            reject({
              success: false,
              reason: `Returned ${res.status} code.\nResponse Contents: ${res.data}`,
            })
          })
          .catch(err => {
            reject({ success: false, reason: err })
          })
      })
    },
  },
  modules: {},
  getters: {
    movies: state => state.movies,
  },
})
