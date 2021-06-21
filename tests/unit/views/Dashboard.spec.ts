import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import { Dashboard } from '@/views';
import { UserStoreActions } from '@/store/modules/user/actions';
import { UserStoreMutations } from '@/store/modules/user/mutations';
import { FinanceStoreActions } from '@/store/modules/finances/actions';
import { defaultFinanceModel, defaultUserModel } from '../mockedEntities';

const $router = {
  push: jest.fn(),
};

const defaultStoreActions: any = {
  [UserStoreActions.SIGN_UP]: jest.fn(),
  [UserStoreActions.SIGN_IN]: jest.fn(),
  [UserStoreActions.SIGN_OUT]: jest.fn(),
  [FinanceStoreActions.GET_FINANCES]: jest.fn(),
};

const defaultStoreMutations: any = {
  [UserStoreMutations.SET_USER]: jest.fn(),
  [UserStoreMutations.SET_TOKEN]: jest.fn(),
  [UserStoreMutations.CLEAN_USER_STATE]: jest.fn(),
};

const defaultStoreGetters: any = {
  user: () => defaultUserModel(),
  finances: () => [defaultFinanceModel()],
};

const createViewStore = (
  actions = defaultStoreActions,
  mutations = defaultStoreMutations,
  getters = defaultStoreGetters,
) => createStore({
  actions,
  mutations,
  getters,
});

const mountDashboardView = (customStore?: any) => mount(Dashboard, {
  global: {
    plugins: [customStore || createViewStore()],
    mocks: {
      $router,
    },
    stubs: ['router-link'],
  },
});

describe('Dashboard view', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('render', () => {
    describe('header', () => {
      it('renders header with user name', () => {
        const testUser = defaultUserModel();
        const mountedDashboardView = mountDashboardView();

        const headerText = mountedDashboardView
          .find('header span')
          .text();

        expect(headerText).toEqual(`Olá, ${testUser.firstName} ${testUser.lastName}`);
      });
    });

    describe('finances list', () => {
      it('renders finances got from vuex store', () => {
        const mountedDashboardView = mountDashboardView();
        expect(mountedDashboardView.findAll('.record')).toHaveLength(1);

        const finance = mountedDashboardView.find('.record');
        const financeDescription = finance.find('span:first-child');
        const financeValue = finance.find('span:last-child');

        expect(financeDescription.text()).toEqual(defaultFinanceModel().description);
        expect(financeValue.text()).toEqual(defaultFinanceModel().value);
      });

      it('renders calculated balance, and applies the correct styles considering if it is positive or negative', () => {
        const finance1 = defaultFinanceModel();
        const finance2 = { ...defaultFinanceModel(), id: 2, value: '15,60' };

        const customStoreGetters = {
          ...defaultStoreGetters,
          finances: () => [finance1, finance2],
        };
        const customStore = createViewStore(
          defaultStoreActions,
          defaultStoreMutations,
          customStoreGetters,
        );

        const balanceWrapper = mountDashboardView(customStore).find('.balance span:last-child');
        expect(balanceWrapper.classes()).toContain('income');
      });

      it('renders box with fallback message if there is not any finances stored in state', () => {
        const customStoreGetters = {
          ...defaultStoreGetters,
          finances: () => [],
        };
        const customStore = createViewStore(
          defaultStoreActions,
          defaultStoreMutations,
          customStoreGetters,
        );

        const financesBox = mountDashboardView(customStore).find('.records');

        expect(financesBox.classes()).toContain('empty-box');
        expect(financesBox.find('.empty-box-message').exists()).toBe(true);
      });
    });
  });

  describe('computed', () => {
    describe('user', () => {
      it('returns user data stored in state', () => {
        const mountedDashboardView = mountDashboardView();
        expect(mountedDashboardView.vm.user).toEqual(defaultUserModel());
      });

      it('returns empty object if there is no user stored in state', () => {
        const customStoreGetters = {
          ...defaultStoreGetters,
          user: () => null,
        };
        const customStore = createViewStore(
          defaultStoreActions,
          defaultStoreMutations,
          customStoreGetters,
        );

        const mountedDashboardView = mountDashboardView(customStore);

        expect(mountedDashboardView.vm.user).toEqual({});
      });
    });

    describe('finances', () => {
      it('returns finances stored in state', () => {
        const mountedDashboardView = mountDashboardView();
        expect(mountedDashboardView.vm.finances).toEqual([defaultFinanceModel()]);
      });
    });

    describe('financesBalance', () => {
      it('returns the sum of all the user finances, with 2 decimal places', () => {
        const finance1 = defaultFinanceModel();
        const finance2 = { ...defaultFinanceModel(), id: 2, value: '15,60' };

        const financesSum = parseFloat(finance1.value.replace(',', '.')) + parseFloat(finance2.value.replace(',', '.'));
        const expected = financesSum.toFixed(2).replace('.', ',');

        const customStoreGetters = {
          ...defaultStoreGetters,
          finances: () => [finance1, finance2],
        };
        const customStore = createViewStore(
          defaultStoreActions,
          defaultStoreMutations,
          customStoreGetters,
        );

        const mountedDashboardView = mountDashboardView(customStore);

        expect(mountedDashboardView.vm.financesBalance).toEqual(expected);
      });
    });
  });

  describe('mounted', () => {
    it('fetches user finances from the API', (done) => {
      const mountedDashboardView = mountDashboardView();

      mountedDashboardView.vm.$nextTick(() => {
        expect(defaultStoreActions[FinanceStoreActions.GET_FINANCES]).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('methods', () => {
    describe('signOut', () => {
      it('calls action to sign out and redirect user to the authentication view', async () => {
        const mountedDashboardView = mountDashboardView();

        await mountedDashboardView.vm.signOut();

        expect(defaultStoreActions[UserStoreActions.SIGN_OUT]).toHaveBeenCalled();
        expect($router.push).toHaveBeenCalledWith('/');
      });
    });
  });
});
