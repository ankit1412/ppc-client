<template>
<div>
  <v-select
    v-model="inputVal"
    :items="currencies"
    item-text="value"
    label="Currency*"
    :loading="loading"
    return-object
    :name="name"
    :error-messages="error"
  >
    <template slot="selection" slot-scope="{ item }">
      <v-chip
        color="accent"
        small
        class="white--text"
      >
          <v-avatar >{{item.symbol}}</v-avatar>
        <span v-text="item.value"></span>
      </v-chip>
    </template>
    <template slot="item" slot-scope="{ item }">
      <v-list-tile-avatar
        color="accent"
        class="headline font-weight-light white--text"
      >
        <v-avatar dark>{{item.symbol}}</v-avatar>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.value"></v-list-tile-title>
        <v-list-tile-sub-title v-text="item.name"></v-list-tile-sub-title>
      </v-list-tile-content>
    </template>
  </v-select>
</div>
</template>

<script>
import CURRENCIES from '@/api/settings/currency/Currencies.gql';

export default {
  name: 'Currency',
  data() {
    return {
      currencies: [],
      loading: false,
    };
  },
  computed: {
    inputVal: {
      get() {
        return this.value || this.currencies.find(c => c.default === true);
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  props: {
    value: Object,
    error: String,
    name: String,
  },
  apollo: {
    currencies: {
      query: CURRENCIES,
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
