import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import { Transaction } from '@/views';
import { Button } from '@/components';
import { FinanceStoreActions } from '@/store/modules/finances/actions';

const $router = {
  push: jest.fn(),
};

const defaultRoute = {
  params: {
    transactionType: 'entrada',
  },
};

const defaultStoreActions = {
  [FinanceStoreActions.CREATE_FINANCE]: jest.fn(),
};

const createViewStore = ({
  actions = defaultStoreActions,
  mutations = {},
  getters = {},
}) => createStore({
  actions,
  mutations,
  getters,
});

const defaultViewData = {
  value: '11,50',
  description: 'Test',
  errors: [],
};

const mountTransactionView = ({
  customStore,
  $route = defaultRoute,
}: any) => mount(Transaction, {
  global: {
    plugins: [customStore || createViewStore({})],
    mocks: { $router, $route },
  },
  data: () => defaultViewData,
});

describe('Transaction view', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('render', () => {
    it('shows the correct texts in transaction form title and button', () => {
      const mountedTransactionView = mountTransactionView({});

      const formTitle = mountedTransactionView.find('.title');
      expect(formTitle.text()).toEqual('Nova entrada');

      const button = mountedTransactionView.findComponent(Button);
      expect(button.text()).toEqual('Salvar entrada');
    });
  });

  describe('computed', () => {
    describe('transactionType', () => {
      it('returns transaction type got from route param', () => {
        const mountedTransactionView = mountTransactionView({});

        expect(mountedTransactionView.vm.transactionType).toEqual(
          defaultRoute.params.transactionType,
        );
      });
    });

    describe('formData', () => {
      it('returns hardcoded form texts for each transaction type', () => {
        const mountedTransactionView = mountTransactionView({});

        expect(mountedTransactionView.vm.formData).toEqual({
          title: {
            entrada: 'Nova entrada',
            saida: 'Nova saída',
          },
          buttonText: {
            entrada: 'Salvar entrada',
            saida: 'Salvar saída',
          },
        });
      });
    });
  });

  describe('methods', () => {
    describe('handleSubmit', () => {
      it('calls action to create finance and redirects user to dashboard view', async () => {
        const mountedTransactionView = mountTransactionView({});

        jest.spyOn(mountedTransactionView.vm, 'verifyErrors').mockImplementationOnce(() => null);

        await mountedTransactionView.vm.handleSubmit({ preventDefault: jest.fn() });

        expect(defaultStoreActions[FinanceStoreActions.CREATE_FINANCE]).toHaveBeenCalledWith(
          expect.any(Object),
          expect.objectContaining({
            value: defaultViewData.value,
            description: defaultViewData.description,
            type: 'INCOME',
          }),
        );
        expect($router.push).toHaveBeenCalledWith('/dashboard');
      });

      it('early returns if there are errors in state', async () => {
        const mountedTransactionView = mountTransactionView({});
        await mountedTransactionView.setData({ errors: ['Test'] });

        jest.spyOn(mountedTransactionView.vm, 'verifyErrors').mockImplementationOnce(() => null);

        await mountedTransactionView.vm.handleSubmit({ preventDefault: jest.fn() });

        expect(defaultStoreActions[FinanceStoreActions.CREATE_FINANCE]).not.toHaveBeenCalled();
        expect($router.push).not.toHaveBeenCalled();
      });
    });

    describe('verifyErrors', () => {
      it('pushes error to errors state if value input is empty', async () => {
        const mountedTransactionView = mountTransactionView({});
        await mountedTransactionView.setData({ value: '' });

        mountedTransactionView.vm.verifyErrors();

        expect(mountedTransactionView.vm.errors).toContain('Insira um valor');
      });

      it('pushes error to errors state if value input does not include a comma', async () => {
        const mountedTransactionView = mountTransactionView({});
        await mountedTransactionView.setData({ value: '12.50' });

        mountedTransactionView.vm.verifyErrors();

        expect(mountedTransactionView.vm.errors).toContain('Insira o valor separado por vírgula');
      });

      it('pushes error to errors state if value input does not include cents value correctly', async () => {
        const mountedTransactionView = mountTransactionView({});
        await mountedTransactionView.setData({ value: '12,5' });

        mountedTransactionView.vm.verifyErrors();

        expect(mountedTransactionView.vm.errors).toContain('Insira o valor informando o valor dos centavos');
      });

      it('pushes error to errors state if value input includes R$', async () => {
        const mountedTransactionView = mountTransactionView({});
        await mountedTransactionView.setData({ value: 'R$12,50' });

        mountedTransactionView.vm.verifyErrors();

        expect(mountedTransactionView.vm.errors).toContain('Insira o valor sem incluir R$');
      });

      it('pushes error to errors state if value input includes characters other than numbers', async () => {
        const mountedTransactionView = mountTransactionView({});
        await mountedTransactionView.setData({ value: 'a12b,50' });

        mountedTransactionView.vm.verifyErrors();

        expect(mountedTransactionView.vm.errors).toContain('Insira apenas valores numéricos');
      });
    });
  });
});
