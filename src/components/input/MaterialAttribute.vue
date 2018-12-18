<template>
<div>
  <v-select
    v-model="inputVal"
    :items="materialAttributes"
    item-text="value"
    item-value="value"
    label="Attribute*"
    :name="name"
    :loading="loading"
    :error-messages="error"
  >
  </v-select>
</div>
</template>

<script>
import ATTRIBUTES from '@/api/settings/attribute/Attributes.gql';

export default {
  name: 'MaterialAttribute',
  data() {
    return {
      materialAttributes: [],
      loading: false,
    };
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  props: {
    value: [Object, String],
    error: String,
    name: String,
  },
  apollo: {
    materialAttributes: {
      query: ATTRIBUTES,
      watchLoading(isLoading) {
        if (isLoading) {
          this.loading = true;
        } else {
          this.loading = false;
        }
      },
    },
  },
};
</script>
