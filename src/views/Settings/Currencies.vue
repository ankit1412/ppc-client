<template>
  <div>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <AddCurrency @onCancel="dialog = false"></AddCurrency>
    </v-dialog>

    <CardContainer flat transparent>
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
          :items="currencies"
          hide-actions
          :loading="loading"
          :search="search"
          :no-results-text="`Your search for ${search} found no results`"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.value }}</td>
            <td>{{ props.item.symbol }}</td>
            <td>{{ props.item.default ? 'Yes' : '' }}</td>
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
import CURRENCIES from '@/api/settings/currency/Currencies.gql';
import AddCurrency from '@/components/add-new/settings/Currency.vue';

export default {
  title() {
    return 'Settings - Currency';
  },
  components: {
    AddCurrency,
  },
  data() {
    return {
      currencies: [],
      search: null,
      loading: false,
      dialog: false,
      headers: [
        { text: 'Currency', align: 'left', value: 'value' },
        { text: 'Symbol', align: 'left', value: 'symbol' },
        { text: 'Default', align: 'left', value: 'default' },
      ],
    };
  },
  methods: {
    addNew() {
      this.dialog = true;
    },
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
