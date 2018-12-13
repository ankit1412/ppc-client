<template>
  <v-snackbar
    v-model="alert.show"
    :color="alert.type"
    :timeout="timeout"
    bottom
    right
  >
    {{ alert.message }}
    <v-btn flat @click="alert.show = false" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppSnackbar',
  data() {
    return {
      snackbar: false,
      timeout: 3000,
    };
  },
  computed: {
    ...mapGetters(['alert']),
  },
};
</script>
