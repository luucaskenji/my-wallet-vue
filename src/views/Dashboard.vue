<template>
  <Container>
    <header>
      <div>
        <span>{{ `Olá, ${user.firstName} ${user.lastName}` }}</span>
      </div>

      <div @click='signOut()'>
        <img src='/assets/sign-out.svg' />
      </div>
    </header>

    <div class='records' :class='{ "empty-box": !finances.length }'>
      <div v-if='finances.length'>
        <div v-for='finance in finances' :key='finance.id'>
          <div class='record'>
            <span>{{ finance.description }}</span>
            <span
              :class='{ income: finance.type === "INCOME", expense: finance.type === "EXPENSE" }'
            >
              {{ finance.value }}
            </span>
          </div>
        </div>
        <div class='balance'>
          <span>Saldo</span>
          <span
            :class='{
              income: parseFloat(financesBalance) > 0,
              expense: parseFloat(financesBalance) < 0
            }'
          >
            {{ financesBalance }}
          </span>
        </div>
      </div>

      <div class='empty-box-message' v-else>
        Não há registro de entradas ou saídas
      </div>
    </div>

    <div class='buttons-container'>
      <button>
        <router-link to='/transacao/entrada'>
          <img src='/assets/add-circle-outline.svg' />
          Nova Entrada
        </router-link>
      </button>

      <button>
        <router-link to='/transacao/saida'>
          <img src='/assets/remove-circle-outline.svg' />
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
import { UserStoreActions } from '@/store/modules/user/actions';

export default defineComponent({
  name: 'Dashboard',
  components: {
    Container,
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
          const financeValue = finance.value.replace(',', '.');
          const convertedValue = finance.type === 'INCOME'
            ? parseFloat(financeValue)
            : parseFloat(financeValue) * (-1);

          return acc + convertedValue;
        }, 0)
        .toFixed(2)
        .replace('.', ',');
    },
  },
  async mounted() {
    await this.$store.dispatch(FinanceStoreActions.GET_FINANCES);
  },
  methods: {
    async signOut(): Promise<void> {
      await this.$store.dispatch(UserStoreActions.SIGN_OUT);

      this.$router.push('/');
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
  flex-grow: 1;
  overflow: scroll;
  padding: 8px 8px 0 8px;
  max-height: 55vh;
  width: 85%;
  background: white;
  border-radius: 5px;
  font-size: 1.1rem;
  position: relative;
}

.empty-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-box-message {
  text-align: center;
}

.record {
  display: flex;
  justify-content: space-between;
}

.balance {
  width: 100%;
  background: white;
  position: sticky;
  bottom: 0;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
