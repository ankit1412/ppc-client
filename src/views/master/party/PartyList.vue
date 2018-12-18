<template>
  <div>

    <AddParty
      :dialog="dialog"
      :partyType="addNewTitle"
      @onClose="dialog = false"
    ></AddParty>

    <CardContainer :title="partyType">
      <div slot="text">
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6 md4 lg3>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table
          :headers="headers"
          :items="parties"
          hide-actions
          :loading="loading"
          :search="search"
          :no-results-text="`Your search for ${search} found no results`"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.phone }}</td>
            <td>{{ props.item.address.country }}</td>
          </template>
        </v-data-table>
      </div>
    </CardContainer>

    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="primary"
      @click="addNew"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import AddParty from './AddParty.vue';

export default {
  title() {
    return 'Master - Parties';
  },
  components: {
    AddParty,
  },
  data() {
    return {
      dialog: false,
      search: null,
      loading: false,
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Email', align: 'left', value: 'email' },
        { text: 'Phone', align: 'left', value: 'phone' },
        { text: 'Country', align: 'left', value: 'address.country' },
      ],
      parties: [],
    };
  },
  computed: {
    partyType() {
      return this.$route.name;
    },
    addNewTitle() {
      return this.partyType.toLowerCase().slice(0, -1);
    },
  },
  methods: {
    addNew() {
      this.dialog = true;
    },
  },
};
</script>
