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
        <b-button
          id="search-button"
          type="is-primary"
          :class="{ show: watchlistURL }"
        >
          Search
        </b-button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      watchlistURL: ""
    };
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
}
</style>
