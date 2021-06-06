import { ActionTree } from 'vuex';

import { RootState } from '@/store/rootState';
import { getFinances } from '@/utils/api/queries';
import { APIQuery } from '@/utils/api/client';
import { FinanceState } from './state';

export enum FinanceStoreActions {
  GET_FINANCES = 'GET_FINANCES',
}

export const actions: ActionTree<FinanceState, RootState> = {
  async GET_FINANCES() {
    const response = await APIQuery(getFinances) as any;

    const finances = response.data.getFinances;

    console.log(finances);
  },
};
