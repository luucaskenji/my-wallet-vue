/* eslint-disable @typescript-eslint/no-explicit-any */

import { mount, VueWrapper } from '@vue/test-utils';
import { Auth } from '@/views';
import { Input } from '@/components';
import { UserStoreActions } from '@/store/modules/user/actions';

describe('Auth.vue', () => {
  let wrapper: VueWrapper<any>;
  const $store = {
    dispatch: jest.fn(),
    commit: jest.fn(),
  };

  const $router = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = mount(Auth, {
      global: {
        mocks: { $store, $router },
      },
    });
  });

  afterEach(() => wrapper.unmount());

  describe('Sign in form', () => {
    it('renders sign in form initially', () => {
      expect(wrapper.vm.showLoginForm).toBe(true);
      expect(wrapper.findAllComponents(Input).length).toBe(2);
      expect(wrapper.find('input.firstName').exists()).toBe(false);
      expect(wrapper.find('input.lastName').exists()).toBe(false);
      expect(wrapper.find('input.password').exists()).toBe(false);
      expect(wrapper.find('input.confirmPassword').exists()).toBe(false);
    });

    it('renders button with `Entrar` text initially', () => {
      expect(wrapper.find('button').text()).toEqual('Entrar');
    });

    it('renders form switcher helper with text to change to the sign up form', () => {
      expect(wrapper.find('span').text()).toEqual('Primeira vez aqui? Crie sua conta!');
    });

    it('changes showLoginForm to false if form switcher helper is clicked', async () => {
      await wrapper.find('span').trigger('click');

      expect(wrapper.vm.showLoginForm).toBe(false);
    });
  });

  describe('Sign up form', () => {
    beforeEach(async () => {
      await wrapper.setData({ showLoginForm: false });
    });

    it('renders sign up form if showLoginForm state is false', async () => {
      expect(wrapper.findAllComponents(Input).length).toBe(5);
      expect(wrapper.find('input.firstName').exists()).toBe(true);
      expect(wrapper.find('input.lastName').exists()).toBe(true);
      expect(wrapper.find('input.password').exists()).toBe(true);
      expect(wrapper.find('input.confirmPassword').exists()).toBe(true);
    });

    it('renders button with `Criar conta` text', () => {
      expect(wrapper.find('button').text()).toEqual('Criar conta');
    });

    it('renders form switcher helper with text to change to the sign in form', () => {
      expect(wrapper.find('span').text()).toEqual('Já possui uma conta? Faça seu login');
    });

    it('changes showLoginForm to true if form switcher helper is clicked', async () => {
      await wrapper.find('span').trigger('click');

      expect(wrapper.vm.showLoginForm).toBe(true);
    });

    describe('input errors', () => {
      it('does not render error box if there are no errors', () => {
        expect(wrapper.find('.errors').exists()).toBe(false);
      });

      it('renders errors list items in the same quantity as existing errors', async () => {
        const errors = ['error 1', 'error 2'];
        await wrapper.setData({ errors });

        expect(wrapper.findAll('.errors li').length).toEqual(errors.length);
      });
    });
  });

  describe('computed', () => {
    describe('formSwitchMessage', () => {
      it('returns message to create a new account when login form is shown', async () => {
        expect(wrapper.vm.formSwitchMessage).toEqual('Primeira vez aqui? Crie sua conta!');
      });

      it('returns message to sign in when sign up form is shown', async () => {
        await wrapper.setData({ showLoginForm: false });

        expect(wrapper.vm.formSwitchMessage).toEqual('Já possui uma conta? Faça seu login');
      });
    });
  });

  describe('methods', () => {
    describe('switchFormType', () => {
      it('switches shown form in Auth view and clean errors in state', async () => {
        await wrapper.setData({ errors: ['error 1', 'error 2'] });

        wrapper.vm.switchFormType();

        expect(wrapper.vm.showLoginForm).toBe(false);
        expect(wrapper.vm.errors).toEqual([]);
      });
    });

    describe('signUp', () => {
      const event = { preventDefault: () => true };

      it('calls vuex `dispatch` function and show the login form in the end', async () => {
        const signUpData = {
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'Test',
          password: 'test123456',
          passwordConfirmation: 'test123456',
        };

        await wrapper.setData({ showLoginForm: false, ...signUpData });
        await wrapper.vm.signUp(event);

        expect($store.dispatch).toHaveBeenCalledWith(UserStoreActions.SIGN_UP, signUpData);
        expect(wrapper.vm.$data.showLoginForm).toBe(true);
      });

      it('early returns if isLoading data is true', async () => {
        await wrapper.setData({ isLoading: true });
        await wrapper.vm.signUp(event);

        expect($store.dispatch).not.toHaveBeenCalled();
      });

      it('early returns if there are errors in state', async () => {
        await wrapper.setData({ errors: ['error'] });
        await wrapper.vm.signUp(event);

        expect($store.dispatch).not.toHaveBeenCalled();
      });
    });

    describe('signIn', () => {
      const event = { preventDefault: () => true };

      it('calls vuex `dispatch` and redirects to dashboard page', async () => {
        const signInData = {
          email: 'test@test.com',
          password: 'test123456',
        };

        await wrapper.setData(signInData);
        await wrapper.vm.signIn(event);

        expect($store.dispatch).toHaveBeenCalledWith(UserStoreActions.SIGN_IN, signInData);
        expect($router.push).toHaveBeenCalledWith('/dashboard');
      });
    });

    describe('verifyErrors', () => {
      it('pushes error to errors state if any required input data is empty', async () => {
        const requiredData = {
          email: '', // empty required data
          firstName: 'Test',
          lastName: 'Test',
          password: 'test123456',
          passwordConfirmation: 'test123456',
        };

        await wrapper.setData(requiredData);

        wrapper.vm.verifyErrors();

        expect(wrapper.vm.$data.errors).toContain('Todos os campos são obrigatórios');
      });

      it('pushes error to errors state if firstName or lastName data are longet than 15 characters', async () => {
        const requiredData = {
          email: 'test@test.com',
          firstName: 'Test Name longer than 15 characters',
          lastName: 'Test',
          password: 'test123456',
          passwordConfirmation: 'test123456',
        };

        await wrapper.setData(requiredData);

        wrapper.vm.verifyErrors();

        expect(wrapper.vm.$data.errors).toContain('Os nomes devem ter no máximo 15 caracteres');
      });

      it('pushes error to errors state if password data is shorter than 6 characters', async () => {
        const requiredData = {
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'Test',
          password: 'test',
          passwordConfirmation: 'test',
        };

        await wrapper.setData(requiredData);

        wrapper.vm.verifyErrors();

        expect(wrapper.vm.$data.errors).toContain('A senha deve ter de 6 a 15 caracteres');
      });

      it('pushes error to errors state if password data is longer than 15 characters', async () => {
        const requiredData = {
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'Test',
          password: 'testpasswordlongerthan15characters',
          passwordConfirmation: 'testpasswordlongerthan15characters',
        };

        await wrapper.setData(requiredData);

        wrapper.vm.verifyErrors();

        expect(wrapper.vm.$data.errors).toContain('A senha deve ter de 6 a 15 caracteres');
      });

      it('pushes error to errors state if password data is not equal to passwordConfimation data', async () => {
        const requiredData = {
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'Test',
          password: 'test123456',
          passwordConfirmation: 'test',
        };

        await wrapper.setData(requiredData);

        wrapper.vm.verifyErrors();

        expect(wrapper.vm.$data.errors).toContain('As senhas devem ser iguais');
      });
    });
  });
});
