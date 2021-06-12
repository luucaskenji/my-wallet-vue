import { GetterTree } from 'vuex';

import { RootState } from '@/store/rootState';
import { FinanceModel } from '@/models';
import { FinanceState } from './state';

export const getters: GetterTree<FinanceState, RootState> = {
  // eslint-disable-next-line arrow-body-style
  finances: (state): FinanceModel[] => {
    return Object.values(state.finances).map((finance) => new FinanceModel(finance));
  },
};
