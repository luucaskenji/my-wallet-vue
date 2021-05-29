import { GetterTree } from 'vuex';

import { RootState } from '@/store/rootState';
import { UserModel } from '@/models/UserModel';
import { UserState } from './state';

export const getters: GetterTree<UserState, RootState> = {
  user: (state): UserModel | null => (
    state.user
      ? new UserModel(state.user, state.accessToken)
      : null
  ),
};
