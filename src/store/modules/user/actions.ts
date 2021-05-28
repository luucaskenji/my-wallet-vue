import { ActionTree } from 'vuex';

import { RootState } from '@/store/rootState';
import { UserState } from './state';

const actions: ActionTree<UserState, RootState> = {
  async SIGN_UP(_, { email, password }: { email: string; password: string }) {
    return null;
  },
};
