<template>
  <div class="about">
    <section class="section">
      <div class="container">
        <div
          class="columns"
          v-for="index in Math.floor(sortedMovies.length / 5)"
          :key="index"
        >
          <div
            class="column is-one-fifth"
            v-for="movie in sortedMovies.slice(
              (index - 1) * 5,
              (index - 1) * 5 + 5
            )"
            :key="movie.name + movie.onNetflix"
          >
            <MovieCard :movie="movie" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import MovieCard from "@/components/MovieCard";

export default {
  components: { MovieCard },
  data() {
    return {
      sortedMovies: []
    };
  },
  methods: {
    compareMovies(m1, m2) {
      if (m1.loading === true) return 1;
      if (m2.loading === true) return -1;
      if (m1.onNetflix === m2.onNetflix) return 0;
      if (m1.onNetflix === true && m2.onNetflix === false) return -1;
      return 1;
    }
  },
  mounted() {
    console.log(this.$store.getters.movies.length, "movies in total.");
    for (let i = 0; i < this.$store.getters.movies.length; i++) {
      let movie = this.$store.getters.movies[i];

      const newMovie = {
        ...movie,
        loading: false
      };

      axios
        .get(
          `${process.env.VUE_APP_NETFLIX_API_URL}/movie/?title=${movie.name}`
        )
        .then(res => {
          if (res.status == 200 && res.data.data && res.data.data.length > 0) {
            newMovie.onNetflix = true;
          } else {
            newMovie.onNetflix = false;
          }
        })
        .catch(() => {
          newMovie.onNetflix = false;
        })
        .finally(() => {
          axios
            .get(
              `${process.env.VUE_APP_TMDB_API_URL}/search/movie?query=${movie.name}&api_key=${process.env.VUE_APP_TMDB_API_TOKEN}`
            )
            .then(res => {
              if (res.status == 200 && res.data.results.length > 0) {
                newMovie.poster = `${process.env.VUE_APP_TMDB_IMG_URL}${res.data.results[0].poster_path}`;
              }
            })
            .finally(() => {
              this.$store.commit("updateMovie", {
                movieIndex: i,
                newMovie: newMovie
              });
              this.sortedMovies = this.$store.getters.movies;
              this.sortedMovies.sort(this.compareMovies);
            });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
