<template>
  <CardContainer title="Add users">
    <div slot="text">
      Add users
    </div>
    <div slot="actions-secondary">
      <v-btn flat>+ user</v-btn>
    </div>
    <div slot="actions-primary">
      <v-btn flat @click="$emit('onCancel')">Cancel</v-btn>
      <v-btn color="primary" flat>Add</v-btn>
    </div>
  </CardContainer>
</template>
