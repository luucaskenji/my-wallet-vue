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

interface Data {
  value: string;
  description: string;
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
    handleSubmit(e: Event) {
      e.preventDefault();

      console.log(this.value);
      console.log(this.description);
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
