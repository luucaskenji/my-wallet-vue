<template>
  <Container>
    <header>
      <div>
        <span>{{ `Olá, ${user.firstName} ${user.lastName}` }}</span>
      </div>
      <img src="/assets/sign-out.svg" />
    </header>

    <div class="records">
      Não há registros
    </div>
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
header {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin-bottom: 30px;
  font-size: 1.5rem;
}

.records {
  height: 80vh;
  width: 85%;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
}
</style>
