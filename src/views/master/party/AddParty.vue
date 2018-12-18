<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <Party :partyType="partyType" @onCancel="$emit('onClose')"></Party>
  </v-dialog>
</template>

<script>
import Party from '@/components/add-new/master/Party.vue';

export default {
  components: {
    Party,
  },
  props: {
    dialog: Boolean,
    partyType: String,
  },
};
</script>
