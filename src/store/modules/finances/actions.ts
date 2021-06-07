import { ActionTree } from 'vuex';

import { RootState } from '@/store/rootState';
import { createFinance, FinanceInput, getFinances } from '@/utils/api/queries';
import { APIMutation, APIQuery } from '@/utils/api/client';
import { FinanceState } from './state';

export enum FinanceStoreActions {
  GET_FINANCES = 'GET_FINANCES',
  CREATE_FINANCE = 'CREATE_FINANCE',
}

export const actions: ActionTree<FinanceState, RootState> = {
  async GET_FINANCES() {
    const response = await APIQuery(getFinances);

    const finances = response.data.getFinances;

    console.log(finances);
  },
  async CREATE_FINANCE(_, finance: FinanceInput) {
    const response = await APIMutation(createFinance, { input: finance });

    const newFinance = response.data.createFinance;

    console.log(newFinance);
  },
};
