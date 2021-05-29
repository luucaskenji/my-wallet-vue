import { ActionTree } from 'vuex';

import { RootState } from '@/store/rootState';
import { APIMutation } from '@/utils/api/client';
import {
  createUserAccount,
  signIn,
  SignInInput,
  UserInput,
} from '@/utils/api/queries';
import { UserState } from './state';
import { UserMutations } from './mutations';

export const actions: ActionTree<UserState, RootState> = {
  async SIGN_UP(_, userData: UserInput) {
    return APIMutation(createUserAccount, { input: userData });
  },
  async SIGN_IN({ commit }, userData: SignInInput) {
    const response = await APIMutation(signIn, { input: userData });
    const { user, token } = response.data.createSession;

    commit(UserMutations.SET_USER, user);
    commit(UserMutations.SET_TOKEN, token);
  },
};
