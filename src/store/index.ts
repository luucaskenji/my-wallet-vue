import { createStore } from 'vuex';

import user from './modules/user';
import finances from './modules/finances';

export default createStore({
  state: {},
  modules: {
    user,
    finances,
  },
});
