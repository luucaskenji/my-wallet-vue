<template>
  <Container>
    <h1>My Wallet</h1>
    <form v-if='showLoginForm'>
      <Input type='email' placeholder='E-mail' />
      <Input type='password' placeholder='Senha' />

      <button type='submit'>Entrar</button>
    </form>

    <form v-else>
      <Input type='text' placeholder='Nome' />
      <Input type='email' placeholder='E-mail' />
      <Input type='password' placeholder='Senha' />
      <Input type='password' placeholder='Confirme sua senha' />

      <button type='submit'>Criar conta</button>
    </form>

    <span @click='switchFormType()'>
      {{ formSwitcher }}
    </span>
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Container, Input } from '@/components';

interface Data {
  showLoginForm: boolean;
}

export default defineComponent({
  name: 'Auth',
  components: {
    Container,
    Input,
  },
  data(): Data {
    return {
      showLoginForm: true,
    };
  },
  computed: {
    formSwitcher(): string {
      return this.showLoginForm ? 'Primeira vez aqui? Crie sua conta!' : 'Já possui uma conta? Faça seu login';
    },
  },
  methods: {
    switchFormType(): void {
      this.showLoginForm = !this.showLoginForm;
    },
  },
});
</script>

<style scoped>
  h1 {
    color: white;
    font-family: 'Teko', sans-serif;
    font-size: 1.8rem;
    margin-bottom: 22px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 220px;
  }

  button {
    color: white;
    height: 60px;
    background: var(--lightPurple);
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 15px;
  }

  span {
    color: white;
    text-decoration: underline;
    font-size: 0.6rem;
    cursor: pointer;
  }
</style>
