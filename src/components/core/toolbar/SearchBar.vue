<template>
  <v-layout row wrap>
    <v-text-field
      v-model="search"
      ref="searchField"
      label="Search"
      class="hidden-sm-and-down"
      color="accent"
      solo-inverted
      flat
      clearable
      single-line
      hide-details
    >
    <v-tooltip
      slot="prepend"
      bottom
    >
      <span>Search</span>
      <v-icon slot="activator" @click="setFocus()">mdi-magnify</v-icon>
    </v-tooltip>
    </v-text-field>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    };
  },
  methods: {
    setFocus() {
      this.$refs.searchField.focus();
    },
  },
};
</script>
