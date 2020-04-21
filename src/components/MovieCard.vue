<template>
  <div class="movie box" v-if="movie">
    <span class="title">{{ movie.name }}</span>
    <img :src="movie.poster" />
    <span class="status">
      <b-icon
        :icon="getIcon.icon"
        :class="{ 'fa-spin': getIcon.spin }"
        :type="getIcon.type"
        size="is-large"
      ></b-icon>
    </span>
  </div>
</template>

<script>
export default {
  props: ["movie"],

  computed: {
    getIcon() {
      if (this.movie.loading)
        return { icon: "circle-notch", type: "is-white", spin: true };
      if (this.movie.onNetflix)
        return { icon: "check-circle", type: "is-primary", spin: false };
      return { icon: "times-circle", type: "is-danger", spin: false };
    }
  }
};
</script>

<style lang="scss" scoped>
.movie {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 10rem;
    height: 15rem;
  }

  .title {
    text-transform: capitalize;
    text-align: center;
    font-size: 1.25rem;
  }
}
</style>
