<template>
  <div>

    <AddMaterial
      :dialog="dialog"
      :materialType="addNewTitle"
      @onClose="dialog = false"
    ></AddMaterial>

    <CardContainer :title="materialType">
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
          :items="materials"
          hide-actions
          :loading="loading"
          :search="search"
          :no-results-text="`Your search for ${search} found no results`"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.purchaseUnit }}</td>
            <td>{{ props.item.issueUnit }}</td>
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
import AddMaterial from './AddMaterial.vue';

export default {
  title() {
    return 'Master - Materials';
  },
  components: {
    AddMaterial,
  },
  data() {
    return {
      dialog: false,
      search: null,
      loading: false,
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Purchase unit', align: 'left', value: 'purchaseUnit' },
        { text: 'Issue unit', align: 'left', value: 'issueUnit' },
      ],
      materials: [],
    };
  },
  computed: {
    materialType() {
      let type = '';
      if (this.$route.name === 'Consumables') type = 'Consumables';
      else if (this.$route.name === 'FinishedMaterials') type = 'Finished materials';
      else if (this.$route.name === 'RawMaterials') type = 'Raw materials';
      else if (this.$route.name === 'SemiFinishedMaterials') type = 'Semi-finished materials';
      return type;
    },
    addNewTitle() {
      return this.materialType.toLowerCase().slice(0, -1);
    },
  },
  methods: {
    addNew() {
      this.dialog = true;
    },
  },
};
</script>
