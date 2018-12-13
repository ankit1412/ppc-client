<template>
  <v-avatar :color="color" :size="size">
    <span class="headline black--text">{{ initials }}</span>
  </v-avatar>
</template>

<script>
export default {
  props: {
    user: Object,
    size: String,
  },
  computed: {
    color() {
      if (this.user) {
        return `#${this.user.avatarColor}`;
      }
      return null;
    },
    initials() {
      if (this.user) {
        const one = this.user.firstName.substring(0, 1).toUpperCase();
        const two = this.user.lastName.substring(0, 1).toUpperCase();
        return `${one}${two}`;
      }
      return null;
    },
  },
};
</script>
