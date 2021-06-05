import { ActionTree } from 'vuex';

import { RootState } from '@/store/rootState';
import { getFinances } from '@/utils/api/queries';
import { APIQuery } from '@/utils/api/client';
import { FinanceState } from './state';

export const actions: ActionTree<FinanceState, RootState> = {
  async GET_FINANCES() {
    return APIQuery(getFinances);
  },
};
