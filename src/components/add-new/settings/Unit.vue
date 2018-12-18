<template>
  <CardContainer title="Add measuring unit">
    <div slot="text">
      Add measuring unit
    </div>
    <div slot="actions-primary">
      <v-btn flat @click="$emit('onCancel')">Cancel</v-btn>
      <v-btn color="primary" flat>Add</v-btn>
    </div>
  </CardContainer>
</template>
