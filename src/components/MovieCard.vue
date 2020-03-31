<template>
  <div class="movie" v-if="movie">
    <span class="title">{{ movie.name }}</span>
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .title {
    text-transform: capitalize;
  }
}
</style>
