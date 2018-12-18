<template>
  <JobCard />
</template>

<script>
import JobCard from '@/components/add-new/JobCard.vue';

export default {
  title() {
    return 'Create job card';
  },
  components: {
    JobCard,
  },
};
</script>
