import { mutations } from '@/store/modules/user/mutations';
import { UserState } from '@/store/modules/user/state';
import { defaultUserInfo } from '../../../mockedEntities';

const { SET_USER, SET_TOKEN, CLEAN_USER_STATE } = mutations;

describe('user module mutations', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('SET_USER', () => {
    it('stores sent user as parameter in state', () => {
      const state: any = { user: null };
      const user = defaultUserInfo();

      SET_USER(state, user);

      expect(state.user).toEqual(user);
    });
  });

  describe('SET_TOKEN', () => {
    it('stores sent token parameter in state and in localStorage', () => {
      const state: any = { accessToken: '' };
      const token = 'token';

      jest.spyOn(Storage.prototype, 'setItem');

      SET_TOKEN(state, token);

      expect(state.accessToken).toEqual(token);
      expect(global.localStorage.setItem).toHaveBeenCalledWith('accessToken', token);
    });

    it('early returns if invalid token is sent as parameter', () => {
      const state: any = { accessToken: '' };
      const token = null;

      jest.spyOn(Storage.prototype, 'setItem');

      SET_TOKEN(state, token);

      expect(state.accessToken).not.toEqual(null);
      expect(global.localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('CLEAN_USER_STATE', () => {
    it('sets back initial values to user state and remove access token from local storage', () => {
      const state: UserState = {
        user: defaultUserInfo(),
        accessToken: 'token',
      };

      jest.spyOn(Storage.prototype, 'removeItem');

      CLEAN_USER_STATE(state);

      expect(state.user).toBeNull();
      expect(state.accessToken).toBe('');
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('accessToken');
    });
  });
});
