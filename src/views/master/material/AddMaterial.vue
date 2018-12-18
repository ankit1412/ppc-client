<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <Material :materialType="materialType"  @onCancel="$emit('onClose')"></Material>
  </v-dialog>
</template>

<script>
import Material from '@/components/add-new/master/Material.vue';

export default {
  components: {
    Material,
  },
  props: {
    dialog: Boolean,
    materialType: String,
  },
};
</script>
