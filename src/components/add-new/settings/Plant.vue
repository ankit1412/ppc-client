<template>
  <CardContainer title="Add plant">
    <div slot="text">
      Add plant
    </div>
    <div slot="actions-primary">
      <v-btn flat @click="$emit('onCancel')">Cancel</v-btn>
      <v-btn color="primary" flat>Add</v-btn>
    </div>
  </CardContainer>
</template>
