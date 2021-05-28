import { ActionTree } from 'vuex';

import { RootState } from '@/store/rootState';
import { APIMutation } from '@/utils/api/client';
import { createUserAccount, UserInput } from '@/utils/api/queries';
import { UserState } from './state';

const actions: ActionTree<UserState, RootState> = {
  async SIGN_UP(_, userData: UserInput) {
    return APIMutation(createUserAccount, { input: userData });
  },
};

export default actions;
