<template>
  <v-card :flat="flat" :color="transparent ? 'transparent' : ''">
    <v-card-title class="py-2 secondary white--text" v-if="!!title">
      <h3 class="headline mb-0">{{ title }}</h3>
    </v-card-title>
    <v-card-text>
      <slot name="text"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="actions-secondary"></slot>
      <v-spacer></v-spacer>
      <slot name="actions-primary"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardContainer',
  props: {
    title: String,
    flat: Boolean,
    transparent: Boolean,
  },
};
</script>
