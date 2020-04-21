<template>
  <div>
    <section class="section" v-if="!loading">
      <div class="container is-fluid">
        <div class="card-container">
          <MovieCard :movie="movie" />
        </div>
        <b-field>
          <b-button type="is-primary" @click="generateRandomMovie">
            Another one!
          </b-button>
        </b-field>
      </div>
    </section>
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :can-cancel="false"
    />
  </div>
</template>

<script>
import axios from "axios"
import { randomElement } from "@/helpers/arrays"

import MovieCard from "@/components/MovieCard"

export default {
  components: { MovieCard },
  data() {
    return {
      movie: undefined,
      loading: true,
    }
  },
  methods: {
    generateRandomMovie() {
      this.loading = true
      this.movie = randomElement(this.$store.getters.movies)

      const newMovie = {
        ...this.movie,
        loading: false,
      }
      axios
        .get(
          `${process.env.VUE_APP_NETFLIX_API_URL}/movie/?title=${this.movie.name}`
        )
        .then(res => {
          if (res.status == 200 && res.data.data && res.data.data.length > 0) {
            newMovie.onNetflix = true
          } else {
            newMovie.onNetflix = false
          }
        })
        .catch(() => {
          newMovie.onNetflix = false
        })
        .finally(() => {
          axios
            .get(
              `${process.env.VUE_APP_TMDB_API_URL}/search/movie?query=${this.movie.name}&api_key=${process.env.VUE_APP_TMDB_API_TOKEN}`
            )
            .then(res => {
              if (res.status == 200 && res.data.results.length > 0) {
                newMovie.poster = `${process.env.VUE_APP_TMDB_IMG_URL}${res.data.results[0].poster_path}`
              }
            })
            .finally(() => {
              this.movie = newMovie
              this.loading = false
            })
        })
    },
  },
  mounted() {
    this.generateRandomMovie()
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  width: 14rem;
  margin-bottom: 2.5rem;
}
</style>
