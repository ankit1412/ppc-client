<template>
  <CardContainer title="Add operator">
    <div slot="text">
      <v-text-field
        v-model="operator.name"
        name="name"
        label="Name*"
        type="text"
        id="name"
        data-vv-as="operator name"
        v-validate="`required`"
        :errors="errors.has('name')"
        :error-messages="errors.first('name')"
      ></v-text-field>

      <v-text-field
        v-model="operator.code"
        name="code"
        label="Code*"
        :counter="5"
        type="text"
        id="code"
        data-vv-as="code"
        v-validate="`required|min:5|max:5`"
        :errors="errors.has('code')"
        :error-messages="errors.first('code')"
      ></v-text-field>

      <v-text-field
        v-model="operator.phone"
        phone="phone"
        label="Phone no"
        type="tel"
        id="phone"
      ></v-text-field>

      <v-checkbox
        v-model="operator.isActive"
        label="Is active"
        id="isActive"
      ></v-checkbox>
    </div>
    <div slot="actions-primary">
      <v-btn flat @click="closeDialog">Cancel</v-btn>
      <v-btn color="primary" flat>Add operator</v-btn>
    </div>
  </CardContainer>
</template>

<script>
export default {
  name: 'AddOperator',
  created() {
    this.operator = this.initializeOperator();
  },
  data() {
    return {
      operator: null,
    };
  },
  methods: {
    initializeOperator() {
      return {
        name: '',
        code: '',
        phone: '',
        isActive: true,
      };
    },
    async clear() {
      this.operator = this.initializeOperator();
    },
    closeDialog() {
      this.clear().then(() => this.$validator.reset());
      this.$emit('onCancel');
    },
  },
};
</script>

<style>
#name, #code {
  text-transform: uppercase;
}
</style>
