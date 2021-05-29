import { MutationTree } from 'vuex';
import { UserInfo, UserState } from './state';

const mutations: MutationTree<UserState> = {
  SET_USER(state, user: UserInfo) {
    state.user = user;
  },
  SET_TOKEN(state, token: string) {
    state.accessToken = token;
  },
};

export default mutations;
