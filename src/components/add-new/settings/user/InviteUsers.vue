<template>
  <CardContainer title="Invite users">
    <div slot="text">
      Invite users
    </div>
    <div slot="actions-secondary">
      <v-btn flat>+ user</v-btn>
    </div>
    <div slot="actions-primary">
      <v-btn flat @click="$emit('onCancel')">Cancel</v-btn>
      <v-btn color="primary" flat>Invite</v-btn>
    </div>
  </CardContainer>
</template>
