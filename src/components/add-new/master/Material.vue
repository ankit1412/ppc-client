<template>
  <CardContainer :title="`Add ${materialType}`">
    <div slot="text">
      <v-layout v-if="loading" column justify-center align-center>
        <Spinner color="primary"/>
      </v-layout>
      <div v-else>
        <v-text-field
          v-model="material.name"
          name="materialName"
          label="Name*"
          id="materialName"
          data-vv-as="material name"
          v-validate="`required`"
          :error="errors.has('materialName')"
          :error-messages="errors.first('materialName')"
        ></v-text-field>

        <v-layout row wrap>
          <v-flex xs5 pr-2>
            <MeasuringUnit
              v-model="material.purchaseUnit"
              label="Purchase unit*"
              name="purchaseUnit"
              data-vv-as="purchase unit"
              v-validate="`required`"
              :error="errors.first('purchaseUnit')"
            ></MeasuringUnit>
          </v-flex>
          <v-flex xs7>
            <MeasuringUnit
              v-model="material.issueUnit"
              label="Issue unit*"
              name="issueUnit"
              data-vv-as="issue unit"
              v-validate="`required`"
              :error="errors.first('issueUnit')"
            ></MeasuringUnit>
          </v-flex>
        </v-layout>

        <v-autocomplete
          v-if="showReceipe"
          v-model="material.recipe.ingredients"
          :items="recipe.materials"
          label="Recipe ingredients"
          item-text="name"
          item-value="id"
          multiple
        ></v-autocomplete>

        <v-autocomplete
          v-if="showReceipe"
          v-model="material.recipe.steps"
          :items="recipe.processes"
          label="Recipe steps"
          item-text="name"
          item-value="id"
          multiple
        ></v-autocomplete>

        <v-layout row wrap>
          <template v-for="(attribute, i) in material.attributes">
            <v-flex xs5 :key="`name-${i}`" pr-2>
              <MaterialAttribute
                v-model="attribute.name"
                :name="`attribute${i}`"
                data-vv-as="attribute name"
                v-validate="`required`"
                :error="errors.first(`attribute${i}`)"
              ></MaterialAttribute>
            </v-flex>
            <v-flex xs6 :key="`values-${i}`">
              <v-combobox
                v-model="attribute.values"
                label="Values"
                small-chips
                multiple
              ></v-combobox>
            </v-flex>
            <v-flex xs1 :key="`delete-${i}`">
              <v-btn
                flat
                icon
                color="error"
                class="mt-3"
                :disabled="material.attributes.length <= 1"
                @click="deleteAttribute(i)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-flex>
          </template>
        </v-layout>
      </div>
    </div>
    <div slot="actions-secondary">
      <v-btn
        flat
        :disabled="loading || addLoading"
        @click="addAttribute"
      >
        + Attribute
      </v-btn>
    </div>
    <div slot="actions-primary">
      <v-btn flat @click="closeDialog" :disabled="addLoading">Cancel</v-btn>
      <v-btn
        color="primary"
        flat
        :disabled="loading"
        :loading="addLoading"
      >
        Add material
      </v-btn>
    </div>
  </CardContainer>
</template>

<script>
import MeasuringUnit from '@/components/input/MeasuringUnit.vue';
import MaterialAttribute from '@/components/input/MaterialAttribute.vue';

export default {
  name: 'AddMaterial',
  props: {
    materialType: String,
  },
  components: {
    MeasuringUnit,
    MaterialAttribute,
  },
  created() {
    this.material = this.initializeMaterial();
  },
  data() {
    return {
      material: null,
      loading: false,
      addLoading: false,
      recipe: {
        materials: [],
        processes: [],
      },
    };
  },
  computed: {
    showReceipe() {
      return this.materialType === 'semi-finished material'
        || this.materialType === 'finished material';
    },
  },
  methods: {
    initializeMaterial() {
      return {
        materialType: this.materialType,
        name: '',
        purchaseUnit: null,
        issueUnit: null,
        attributes: [{
          name: null,
          values: [],
        }],
        recipe: {
          ingredients: [],
          steps: [],
        },
      };
    },
    addAttribute() {
      this.material.attributes.push({
        name: null,
        values: [],
      });
    },
    deleteAttribute(index) {
      this.material.attributes.splice(index, 1);
    },
    async clear() {
      this.material = this.initializeMaterial();
    },
    closeDialog() {
      this.clear().then(() => this.$validator.reset());
      this.$emit('onCancel');
    },
  },
};
</script>

<style>
#materialName {
  text-transform: uppercase;
}
</style>
