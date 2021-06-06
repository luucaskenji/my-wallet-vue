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

    <div class="buttons-container">
      <button>
        <img src="/assets/add-circle-outline.svg" />
        Nova Entrada
      </button>

      <button>
        <img src="/assets/remove-circle-outline.svg" />
        Nova Saída
      </button>
    </div>
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

import { Container } from '@/components';
import { UserModel } from '@/models';
import { FinanceStoreActions } from '@/store/modules/finances/actions';

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
  async mounted() {
    await this.$store.dispatch(FinanceStoreActions.GET_FINANCES);
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
  flex-grow: 1;
  width: 85%;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin-top: 20px;
}

button {
  width: 126px;
  height: 130px;
  background: var(--lightPurple);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  cursor: pointer;
}

button img {
  width: 25px;
  margin-bottom: 20px;
}
</style>
