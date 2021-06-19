import {
  createUserAccount, signIn, SignInInput, UserInput,
} from '@/utils/api/queries';
import { actions } from '@/store/modules/user/actions';
import * as clientConnection from '@/utils/api/client';
import { UserStoreMutations } from '@/store/modules/user/mutations';
import { defaultUserInfo } from '../../../mockedEntities';

const { SIGN_UP, SIGN_IN, SIGN_OUT } = actions as any;

jest.mock('@/utils/api/client');

describe('user module actions', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('SIGN_UP', () => {
    it('calls APIMutation with the query and sent parameter as variable', async () => {
      const userData: UserInput = {
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'Test',
        password: 'test123456',
        passwordConfirmation: 'test123456',
      };

      jest.spyOn(clientConnection, 'APIMutation');

      await SIGN_UP(null, userData);

      expect(clientConnection.APIMutation).toHaveBeenCalledWith(
        createUserAccount,
        { input: userData },
      );
    });
  });

  describe('SIGN_IN', () => {
    it('calls vuex mutations to store user and token returned from the API', async () => {
      const userData: SignInInput = {
        email: 'test@test.com',
        password: 'test123456',
      };
      const user = defaultUserInfo();
      const token = 'token';
      const commit = jest.fn();

      jest.spyOn(clientConnection, 'APIMutation').mockResolvedValueOnce({
        data: {
          createSession: {
            user,
            token,
          },
        },
      });

      await SIGN_IN({ commit }, userData);

      expect(clientConnection.APIMutation).toHaveBeenCalledWith(signIn, { input: userData });
      expect(commit).toHaveBeenCalledWith(UserStoreMutations.SET_USER, user);
      expect(commit).toHaveBeenCalledWith(UserStoreMutations.SET_TOKEN, token);
    });

    it('early returns if API response does not come as expected', async () => {
      const userData: SignInInput = {
        email: 'test@test.com',
        password: 'test123456',
      };
      const commit = jest.fn();
      jest.spyOn(clientConnection, 'APIMutation').mockResolvedValueOnce({ data: null });

      await SIGN_IN({ commit }, userData);

      expect(commit).not.toHaveBeenCalled();
    });

    it('calls vuex mutation to clean user state', async () => {
      const commit = jest.fn();

      await SIGN_OUT({ commit });

      expect(commit).toHaveBeenCalledWith(UserStoreMutations.CLEAN_USER_STATE);
    });
  });
});
