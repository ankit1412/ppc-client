<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <Process @onCancel="$emit('onClose')"></Process>
  </v-dialog>
</template>

<script>
import Process from '@/components/add-new/master/Process.vue';

export default {
  components: {
    Process,
  },
  props: {
    dialog: Boolean,
  },
};
</script>
