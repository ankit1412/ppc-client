<template>
  <v-toolbar-items>
    <v-btn flat icon class="hidden-sm-and-down" @click="handleFullScreen()">
      <v-tooltip open-delay="800" bottom>
        <span>
          Fullscreen
        </span>
        <v-icon medium slot="activator">
          mdi-fullscreen
        </v-icon>
      </v-tooltip>
    </v-btn>
  </v-toolbar-items>
</template>

<script>
import { toggleFullScreen } from '@/utils/helper';

export default {
  methods: {
    handleFullScreen() {
      toggleFullScreen();
    },
  },
};
</script>
