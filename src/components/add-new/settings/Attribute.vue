<template>
  <CardContainer title="Add material attribute">
    <div slot="text">
      Add material attribute
    </div>
    <div slot="actions-primary">
      <v-btn flat @click="$emit('onCancel')">Cancel</v-btn>
      <v-btn color="primary" flat>Add</v-btn>
    </div>
  </CardContainer>
</template>
