<template>
  <h1>{{$route.query.q}}</h1>
</template>

<script>
export default {
  title() {
    return `Search - ${this.routeQuery}`;
  },
  computed: {
    routeQuery() {
      return this.$route.query.q;
    },
  },
};
</script>
