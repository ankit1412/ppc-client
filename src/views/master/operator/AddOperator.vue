<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <Operator @onCancel="$emit('onClose')"></Operator>
  </v-dialog>
</template>

<script>
import Operator from '@/components/add-new/master/Operator.vue';

export default {
  components: {
    Operator,
  },
  props: {
    dialog: Boolean,
  },
};
</script>
