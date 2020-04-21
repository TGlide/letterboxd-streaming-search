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
            v-model="listURL"
            rounded
          >
          </b-input>
        </b-field>
        <b-field id="action-buttons" grouped>
          <b-button
            type="is-primary"
            :class="{ show: listURL && urlIsValid() }"
            @click="() => getMovies('MovieList')"
            :loading="loading"
          >
            Search
          </b-button>
          <b-button
            type="is-primary"
            :class="{ show: listURL && urlIsValid() }"
            @click="() => getMovies('RandomMovie')"
            :loading="loading"
          >
            Random
          </b-button>
        </b-field>
      </div>
    </section>
  </div>
</template>

<script>
const wlUrlPattern = /(https:\/\/)?letterboxd.com\/(.*?)\/watchlist(\/)?/
const listUrlPattern = /(https:\/\/)?letterboxd.com\/(.*?)\/list\/([^/]*)/

export default {
  name: "Home",
  data() {
    return {
      listURL: "",
      loading: false,
      error: false,
    }
  },
  methods: {
    urlIsValid() {
      return (
        this.listURL.match(wlUrlPattern) || this.listURL.match(listUrlPattern)
      )
    },

    getMovies(redirectViewName) {
      if (!this.urlIsValid() || this.loading) return
      const watchlistMatch = this.listURL.match(wlUrlPattern)
      const listMatch = this.listURL.match(listUrlPattern)

      let storeAction, payload
      const redirectRoute = { name: redirectViewName }

      if (watchlistMatch) {
        storeAction = "getMoviesFromWatchlist"
        payload = watchlistMatch[2]
      } else if (listMatch) {
        storeAction = "getMoviesFromList"
        payload = { username: listMatch[2], listName: listMatch[3] }
      } else {
        return
      }

      this.loading = true
      this.error = false

      this.$store
        .dispatch(storeAction, payload)
        .then(() => {
          this.$router.push(redirectRoute)
        })
        .catch(() => {
          this.err = true
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#action-buttons {
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  margin: 1rem;

  .button {
    margin: 0 1rem;
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
}
</style>
