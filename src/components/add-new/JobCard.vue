<template>
  <CardContainer title="Create job card">
    <div slot="text">
      Create job card
    </div>
    <div slot="actions-primary">
      <v-btn flat @click="$emit('onCancel')">Cancel</v-btn>
      <v-btn flat color="primary">Create job card</v-btn>
    </div>
  </CardContainer>
</template>
