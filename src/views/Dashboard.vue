<template>
  <div>
    <h1>Dashboard</h1>
    {{ users }}
  </div>
</template>

<script>
import USERS from '@/api/user/Users.gql';

export default {
  title() {
    return 'PPC dashboard';
  },
  data() {
    return {
      users: [],
    };
  },
  apollo: {
    users: {
      query: USERS,
      variables() {
        return {
          filter: {
            status: '',
            firstName: '',
            lastName: '',
          },
        };
      },
    },
  },
};
</script>
