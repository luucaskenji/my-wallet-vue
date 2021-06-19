import { MutationTree } from 'vuex';

import { UserInfo } from '@/models';
import { UserState } from './state';

export enum UserStoreMutations {
  SET_USER = 'SET_USER',
  SET_TOKEN = 'SET_TOKEN',
  CLEAN_USER_STATE = 'CLEAN_USER_STATE'
}

export const mutations: MutationTree<UserState> = {
  SET_USER(state, user: UserInfo) {
    state.user = user;
  },
  SET_TOKEN(state, token: string) {
    if (!token) return;

    state.accessToken = token;
    localStorage.setItem('accessToken', token);
  },
  CLEAN_USER_STATE(state) {
    state.user = null;
    state.accessToken = '';
    localStorage.removeItem('accessToken');
  },
};
