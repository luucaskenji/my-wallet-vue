import { MutationTree } from 'vuex';

import { FinanceInfo } from '@/models';
import { FinanceState } from './state';

export enum FinanceStoreMutations {
  SET_FINANCES = 'SET_FINANCES'
}

export const mutations: MutationTree<FinanceState> = {
  SET_FINANCES(state, finances: FinanceInfo[]) {
    if (!finances) return;

    finances.forEach((finance) => {
      state.finances[finance.id.toString()] = finance;
    });
  },
};
