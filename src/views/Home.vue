<template>
  <div class="home">
    <section class="section">
      <div class="container">
        <h1 class="title">What watchlist do you want to search?</h1>
        <b-field>
          <b-input
            placeholder="Paste the Letterboxd Watchlist URL"
            type="search"
            icon-pack="fas"
            icon="search"
            v-model="watchlistURL"
            rounded
          >
          </b-input>
        </b-field>
        <b-field>
          <b-button
            id="search-button"
            type="is-primary"
            :class="{ show: watchlistURL && urlIsValid() }"
            @click="searchMovies"
            :loading="loading"
          >
            Search
          </b-button>
        </b-field>
      </div>
    </section>
  </div>
</template>

<script>
const urlPattern = /(https:\/\/)?letterboxd.com\/(.*?)\/watchlist(\/)?/;

export default {
  name: "Home",
  data() {
    return {
      watchlistURL: "",
      loading: false,
      error: false
    };
  },
  methods: {
    urlIsValid() {
      return this.watchlistURL.match(urlPattern);
    },

    searchMovies() {
      if (!this.urlIsValid() || this.loading) return;
      const username = this.watchlistURL.match(urlPattern)[2];

      this.loading = true;
      this.error = false;

      this.$store
        .dispatch("getMoviesFromWatchlist", username)
        .then(() => {
          this.$router.push({ name: "MovieList" });
        })
        .catch(err => {
          console.log(err);
          this.err = true;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#search-button {
  display: block;
  margin: 1rem auto;

  opacity: 0;
  transform: translateY(50%);

  transition: 0.5s ease;

  &.show {
    opacity: 1;
    transform: translateY(0%);
  }

  /deep/ & + .help {
    text-align: center;
  }
}
</style>
