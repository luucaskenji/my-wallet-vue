<template>
  <Container>
    <h1>My Wallet</h1>

    <ul class="errors">
      <li>O nome precisa ser válido</li>
    </ul>

    <form v-if='showLoginForm'>
      <Input v-model='email' type='email' placeholder='E-mail'/>
      <Input v-model='password' type='password' placeholder='Senha'/>

      <button type='submit'>Entrar</button>
    </form>

    <form v-else @submit="signUp($event)">
      <div class="sign-up-inputs">
        <Input class="email" v-model='email' type='email' placeholder='E-mail'/>
        <Input class="firstName" v-model='firstName' type='text' placeholder='Primeiro nome'/>
        <Input class="lastName" v-model='lastName' type='text' placeholder='Último nome'/>
        <Input class="password" v-model='password' type='password' placeholder='Senha'/>
        <Input
          class="confirmPassword"
          v-model='passwordConfirmation'
          type='password'
          placeholder='Confirme sua senha'
        />
      </div>

      <button type='submit'>Criar conta</button>
    </form>

    <span @click='switchFormType()'>
      {{ formSwitchMessage }}
    </span>
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Container, Input } from '@/components';

interface Data {
  showLoginForm: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  isLoading: boolean;
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
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      isLoading: false,
    };
  },
  computed: {
    formSwitchMessage(): string {
      return this.showLoginForm ? 'Primeira vez aqui? Crie sua conta!' : 'Já possui uma conta? Faça seu login';
    },
  },
  methods: {
    switchFormType(): void {
      this.showLoginForm = !this.showLoginForm;
    },
    async signUp(event: Event): Promise<void> {
      event.preventDefault();

      if (this.isLoading) return;

      this.isLoading = true;

      await this.$store.dispatch('SIGN_UP', {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      });

      this.isLoading = false;
      this.showLoginForm = true;
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

  .errors {
    width: 300px;
    height: 150px;
    background: white;
    margin-bottom: 22px;
    border-radius: 7px;
    border: 2px solid red;
    padding: 15px;
  }

  .errors li {
    color: red;
    font-size: 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  .sign-up-inputs {
    display: grid;
    grid-template-areas:
      'input1 input1'
      'input2 input3'
      'input4 input4'
      'input5 input5';
    column-gap: 7px;
  }

  .email { grid-area: input1; }
  .firstName { grid-area: input2; }
  .lastName { grid-area: input3; }
  .password { grid-area: input4; }
  .confirmPassword { grid-area: input5; }

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
