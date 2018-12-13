<template>
  <v-layout row>
    <v-dialog v-model="loading" persistent fullscreen hide-overlay>
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <v-progress-circular
            indeterminate
            :size="70"
            :width="7"
            color="primary"
          >
          </v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppLoader',
  computed: {
    ...mapGetters(['loading']),
  },
};
</script>
