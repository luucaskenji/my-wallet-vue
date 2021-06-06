<template>
  <Container justifyContent='flex-start'>
    <form>
      <div class="title">
        {{ formData.title[transactionType] }}
      </div>

      <Input type='text' placeholder='Valor'/>
      <Input type='text' placeholder='Descrição'/>

      <Button type='submit' :innerText='formData.buttonText[transactionType]'/>
    </form>
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

import { Container, Input, Button } from '@/components';

interface Data {}

export default defineComponent({
  components: {
    Container,
    Input,
    Button,
  },
  data(): Data {
    return {};
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
