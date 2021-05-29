import { MutationTree } from 'vuex';
import { UserInfo, UserState } from './state';

export enum UserMutations {
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
