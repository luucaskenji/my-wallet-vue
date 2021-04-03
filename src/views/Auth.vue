<template>
  <Container v-if="showLoginForm">
    <h1>My Wallet</h1>
    <form>
      <input type='email' placeholder='E-mail'>
      <input type='password' placeholder='Senha'>

      <button type="submit">Entrar</button>
    </form>
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
    background: #A86CD6;
    border-radius: 6px;
    font-size: 1rem;
  }
</style>
