import { MutationTree } from 'vuex';

import { UserInfo } from '@/models/UserModel';
import { UserState } from './state';

export enum UserStoreMutations {
  SET_USER = 'SET_USER',
  SET_TOKEN = 'SET_TOKEN'
}

export const mutations: MutationTree<UserState> = {
  SET_USER(state, user: UserInfo) {
    state.user = user;
  },
  SET_TOKEN(state, token: string) {
    state.accessToken = token;
  },
};
