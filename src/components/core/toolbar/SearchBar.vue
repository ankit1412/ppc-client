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
      @keyup.enter.native="searchQuery"
    >
      <v-tooltip
        slot="append-outer"
        bottom
      >
        <span>Search</span>
        <v-icon slot="activator" @click="searchQuery">mdi-magnify</v-icon>
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
    searchQuery() {
      if (this.search && this.search.trim() !== '') {
        this.$router.push({ name: 'Search', query: { q: this.search.trim() } });
      }
    },
  },
};
</script>
