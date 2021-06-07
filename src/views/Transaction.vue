<template>
  <Container justifyContent='flex-start'>
    <form @submit='handleSubmit($event)'>
      <div class="title">
        {{ formData.title[transactionType] }}
      </div>

      <Input v-model.trim='value' type='text' placeholder='Valor'/>
      <Input v-model.trim='description' type='text' placeholder='Descrição'/>

      <Button type='submit' :innerText='formData.buttonText[transactionType]'/>
    </form>
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

import { Container, Input, Button } from '@/components';
import { FinanceStoreActions } from '@/store/modules/finances/actions';

interface Data {
  value: string;
  description: string;
  errors: string[];
}

export default defineComponent({
  components: {
    Container,
    Input,
    Button,
  },
  data(): Data {
    return {
      value: '',
      description: '',
      errors: [],
    };
  },
  computed: {
    transactionType(): string {
      return this.$route.params.transactionType as string;
    },
    formData(): { [key: string]: { [key: string]: string } } {
      return {
        title: {
          entrada: 'Nova entrada',
          saida: 'Nova saída',
        },
        buttonText: {
          entrada: 'Salvar entrada',
          saida: 'Salvar saída',
        },
      };
    },
  },
  methods: {
    async handleSubmit(e: Event): Promise<void> {
      e.preventDefault();
      this.verifyErrors();

      if (this.errors.length) return;

      await this.$store.dispatch(FinanceStoreActions.CREATE_FINANCE, {
        value: this.value,
        description: this.description,
        type: this.transactionType === 'entrada' ? 'INCOME' : 'EXPENSE',
      });
    },
    verifyErrors(): void {
      this.errors = [];

      if (!this.value) {
        this.errors.push('Insira um valor');
        return;
      }

      if (!this.value.includes(',')) {
        this.errors.push('Insira o valor separado por vírgula');
      }

      if (this.value.includes('R$')) {
        this.errors.push('Insira o valor sem incluir R$');
      }

      if (this.value.split(',')[1].length !== 2) {
        this.errors.push('Insira o valor informando o valor dos centavos');
      }

      if (!this.value.match(/^[0-9]+,{1}[0-9]{2}$/)) {
        this.errors.push('Insira apenas valores numéricos');
      }
    },
  },
});
</script>

<style scoped>
form {
  padding: 0 20px;
}

.title {
  font-size: 1.4rem;
  color: white;
  margin: 15px 0;
}
</style>
