<template>
  <CardContainer title="Settings">
    <div slot="text">
      <v-tabs color="transparent">
        <v-tab
          v-for="(tab, index) in tabs"
          :key="index"
          :to="{ name: tab.href }"
        >
          {{tab.name}}
        </v-tab>
      </v-tabs>
      <router-view />
    </div>
  </CardContainer>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { name: 'Users', href: 'Users' },
        { name: 'Plants', href: 'Plants' },
        { name: 'Currencies', href: 'Currencies' },
        { name: 'Measuring units', href: 'Units' },
        { name: 'Material attributes', href: 'Attributes' },
      ],
    };
  },
};
</script>
