<template>
  <Container>
    <header>
      <div>
        <span>{{ `Olá, ${user.firstName} ${user.lastName}` }}</span>
      </div>
      <img src="/assets/sign-out.svg" />
    </header>

    <div class="records">
      <div v-for='finance in finances' :key='finance.id'>
        <div class="record">
          <span>{{ finance.description }}</span>
          <span
            :class='{ income: finance.type === "INCOME", expense: finance.type === "EXPENSE" }'
          >
            {{ finance.value }}
          </span>
        </div>
      </div>

      <div>
        <span>Saldo</span>
        <span>{{ financesBalance }}</span>
      </div>
    </div>

    <div class="buttons-container">
      <button>
        <router-link to='/transacao/entrada'>
          <img src="/assets/add-circle-outline.svg" />
          Nova Entrada
        </router-link>
      </button>

      <button>
        <router-link to='/transacao/saida'>
          <img src="/assets/remove-circle-outline.svg" />
          Nova Saída
        </router-link>
      </button>
    </div>
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

import { Container } from '@/components';
import { UserModel, FinanceModel } from '@/models';
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
    finances(): FinanceModel[] {
      return this.$store.getters.finances;
    },
    financesBalance(): string {
      return this.finances
        .reduce((acc, finance) => {
          const convertedValue = finance.type === 'INCOME'
            ? parseFloat(finance.value)
            : parseFloat(finance.value) * (-1);

          return acc + convertedValue;
        }, 0)
        .toString();
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
  padding: 15px;
  flex-grow: 1;
  width: 85%;
  background: white;
  border-radius: 5px;
  font-size: 1.1rem;
}

.record {
  display: flex;
  justify-content: space-between;
}

.income { color: green; }
.expense { color: red; }

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
  text-align: start;
  padding: 0 10px;
  cursor: pointer;
}

a {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

button img {
  width: 25px;
  margin-bottom: 20px;
}
</style>
