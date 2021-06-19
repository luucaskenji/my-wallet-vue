import { getters } from '@/store/modules/user/getters';
import { UserState } from '@/store/modules/user/state';
import { defaultUserInfo, defaultUserModel } from '../../../mockedEntities';

const { user } = getters;

describe('user module getters', () => {
  describe('user', () => {
    it('returns User Model with user info stored in state', () => {
      const state: UserState = {
        user: defaultUserInfo(),
        accessToken: 'token',
      };

      const returnedValue = user(state, {}, {}, {});

      expect(returnedValue).toEqual(defaultUserModel());
    });

    it('returns null if there is no user in state', () => {
      const state: UserState = {
        user: null,
        accessToken: '',
      };

      const returnedValue = user(state, {}, {}, {});

      expect(returnedValue).toBeNull();
    });
  });
});
