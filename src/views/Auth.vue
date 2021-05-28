<template>
  <Container>
    <h1>My Wallet</h1>
    <form v-if='showLoginForm'>
      <input type='email' placeholder='E-mail'>
      <input type='password' placeholder='Senha'>

      <button type='submit'>Entrar</button>
    </form>

    <form v-else>
      <input type='text' placeholder='Nome'>
      <input type='email' placeholder='E-mail'>
      <input type='password' placeholder='Senha'>
      <input type='password' placeholder='Confirme sua senha'>

      <button type='submit'>Criar conta</button>
    </form>

    <span @click='switchFormType()'>
      {{
        showLoginForm
          ? 'Primeira vez aqui? Crie sua conta!'
          : 'Já possui uma conta? Faça seu login'
      }}
    </span>
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Container from '../components/Container.vue';

export default defineComponent({
  name: 'Auth',
  components: {
    Container,
  },
  data() {
    return {
      showLoginForm: true,
    };
  },
  methods: {
    switchFormType() {
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

  input {
    width: 100%;
    height: 60px;
    margin-bottom: 16px;
    font-size: 1rem;
    border-radius: 6px;
    padding-left: 10px;
  }

  button {
    color: white;
    height: 60px;
    background: #A328D6;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 10px;
  }

  span {
    color: white;
    text-decoration: underline;
    font-size: 0.5rem;
    cursor: pointer;
  }
</style>
