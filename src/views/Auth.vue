<template>
  <Container>
    <h1>My Wallet</h1>

    <ul v-if='errors.length' class='errors' @submit='signIn($event)'>
      <li v-for='error, index in errors' :key='index'>
        {{ error }}
      </li>
    </ul>

    <form v-if='showLoginForm' @submit='signIn($event)'>
      <Input v-model='email' type='email' placeholder='E-mail' autocomplete='on'/>
      <Input v-model='password' type='password' placeholder='Senha' autocomplete='on'/>

      <button type='submit'>Entrar</button>
    </form>

    <form v-else @submit='signUp($event)'>
      <div class='sign-up-inputs'>
        <Input
          class='email'
          v-model.trim='email'
          type='email'
          placeholder='E-mail'
          autocomplete='on'
        />

        <Input
          class='firstName'
          v-model.trim='firstName'
          type='text'
          placeholder='Primeiro nome'
          autocomplete='on'
        />

        <Input
          class='lastName'
          v-model.trim='lastName'
          type='text'
          placeholder='Último nome'
          autocomplete='on'
         />

        <Input
          class='password'
          v-model.trim='password'
          type='password'
          placeholder='Senha'
          autocomplete='on'
        />

        <Input
          class='confirmPassword'
          v-model.trim='passwordConfirmation'
          type='password'
          placeholder='Confirme sua senha'
          autocomplete='on'
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
import { UserStoreActions } from '@/store/modules/user/actions';

interface Data {
  showLoginForm: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  isLoading: boolean;
  errors: string[];
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
      errors: [],
    };
  },
  computed: {
    formSwitchMessage(): string {
      return this.showLoginForm ? 'Primeira vez aqui? Crie sua conta!' : 'Já possui uma conta? Faça seu login';
    },
  },
  methods: {
    switchFormType(): void {
      this.errors = [];
      this.showLoginForm = !this.showLoginForm;
    },
    async signUp(event: Event): Promise<void> {
      event.preventDefault();
      this.verifyErrors();

      if (this.isLoading || this.errors.length) return;

      this.isLoading = true;

      await this.$store.dispatch(UserStoreActions.SIGN_UP, {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      });

      this.isLoading = false;
      this.showLoginForm = true;
    },
    async signIn(event: Event): Promise<void> {
      event.preventDefault();

      await this.$store.dispatch(UserStoreActions.SIGN_IN, {
        email: this.email,
        password: this.password,
      });

      this.$router.push('/dashboard');
    },
    verifyErrors(): void {
      this.errors = [];

      const {
        email,
        firstName,
        lastName,
        password,
        passwordConfirmation,
        errors,
      } = this;

      if ([email, firstName, lastName, password, passwordConfirmation].some((e) => !e)) {
        errors.push('Todos os campos são obrigatórios');
      }

      if ([firstName, lastName].some((n) => n.length > 15)) {
        errors.push('Os nomes devem ter no máximo 15 caracteres');
      }

      if (password.length < 6 || password.length > 15) {
        errors.push('A senha deve ter de 6 a 15 caracteres');
      }

      if (password !== passwordConfirmation) {
        errors.push('As senhas devem ser iguais');
      }
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
    width: var(--auth-forms-width);
    height: fit-content;
    background: white;
    margin-bottom: 22px;
    border-radius: 7px;
    border: 2px solid red;
    padding: 8px 15px;
  }

  .errors li {
    color: red;
    font-size: 0.5rem;
    margin: 7px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    width: var(--auth-forms-width);
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
