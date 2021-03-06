import { ActionTree } from 'vuex';

import { RootState } from '@/store/rootState';
import { APIMutation } from '@/utils/api/client';
import {
  createUserAccount,
  signIn,
  SignInInput,
  signOut,
  UserInput,
} from '@/utils/api/queries';
import { UserState } from './state';
import { UserStoreMutations } from './mutations';

export enum UserStoreActions {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT'
}

export const actions: ActionTree<UserState, RootState> = {
  async SIGN_UP(_, userData: UserInput): Promise<any> {
    return APIMutation(createUserAccount, { input: userData });
  },
  async SIGN_IN({ commit }, userData: SignInInput): Promise<void> {
    const response = await APIMutation(signIn, { input: userData });

    if (!response?.data?.createSession) return;

    const { user, token } = response.data.createSession;

    commit(UserStoreMutations.SET_USER, user);
    commit(UserStoreMutations.SET_TOKEN, token);
  },
  async SIGN_OUT({ commit }) {
    await APIMutation(signOut);

    commit(UserStoreMutations.CLEAN_USER_STATE);
  },
};
