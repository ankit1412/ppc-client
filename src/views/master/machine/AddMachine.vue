<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <Machine @onCancel="$emit('onClose')"></Machine>
  </v-dialog>
</template>

<script>
import Machine from '@/components/add-new/master/Machine.vue';

export default {
  components: {
    Machine,
  },
  props: {
    dialog: Boolean,
  },
};
</script>
