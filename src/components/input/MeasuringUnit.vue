<template>
<div>
  <v-select
    v-model="inputVal"
    :items="measuringUnits"
    item-text="value"
    item-value="value"
    :label="label"
    :name="name"
    :loading="loading"
    :error-messages="error"
  >
  </v-select>
</div>
</template>

<script>
import UNITS from '@/api/settings/unit/Units.gql';

export default {
  name: 'MeasuringUnit',
  data() {
    return {
      measuringUnits: [],
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
    label: String,
    error: String,
    name: String,
  },
  apollo: {
    measuringUnits: {
      query: UNITS,
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
