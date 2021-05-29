<template>
  <Container>
    <header>
      <div>
        <span>{{ `${user.firstName} ${user.lastName}` }}</span>
      </div>
    </header>
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

import { Container } from '@/components';
import { UserModel } from '@/models/UserModel';

interface Data {}

export default defineComponent({
  name: 'Dashboard',
  components: {
    Container,
  },
  data(): Data {
    return {};
  },
  computed: {
    user(): UserModel {
      return this.$store.getters.user || {};
    },
  },
});
</script>

<style scoped>

</style>
