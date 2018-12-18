<template>
  <v-progress-circular
    indeterminate
    :color="color"
  ></v-progress-circular>
</template>

<script>

export default {
  name: 'Spinner',
  props: {
    color: String,
  },
};
</script>
