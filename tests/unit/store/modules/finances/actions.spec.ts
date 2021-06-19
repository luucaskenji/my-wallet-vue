import { actions } from '@/store/modules/finances/actions';
import { FinanceStoreMutations } from '@/store/modules/finances/mutations';
import * as clientConnection from '@/utils/api/client';
import { createFinance, FinanceInput, getFinances } from '@/utils/api/queries';
import { defaultFinanceInfo } from '../../../mockedEntities';

const { GET_FINANCES, CREATE_FINANCE } = actions as any;

jest.mock('@/utils/api/client');

describe('finances module actions', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('GET_FINANCES', () => {
    it('calls mutation to store fetched finances', async () => {
      const commit = jest.fn();
      const APIResponse = {
        data: {
          getFinances: [defaultFinanceInfo()],
        },
      };

      jest.spyOn(clientConnection, 'APIQuery').mockResolvedValueOnce(APIResponse);

      await GET_FINANCES({ commit });

      expect(clientConnection.APIQuery).toHaveBeenCalledWith(getFinances);
      expect(commit).toHaveBeenCalledWith(
        FinanceStoreMutations.SET_FINANCES,
        APIResponse.data.getFinances,
      );
    });

    it('early returns if API response does not come as expected', async () => {
      const commit = jest.fn();
      const APIResponse = { data: null };

      jest.spyOn(clientConnection, 'APIQuery').mockResolvedValueOnce(APIResponse);

      await GET_FINANCES({ commit });

      expect(commit).not.toHaveBeenCalled();
    });
  });

  describe('CREATE_FINANCE', () => {
    it('send to the API created finance', async () => {
      const finance: FinanceInput = {
        value: '14,00',
        description: 'test',
        type: 'INCOME',
      };

      jest.spyOn(clientConnection, 'APIMutation');

      await CREATE_FINANCE(null, finance);

      expect(clientConnection.APIMutation).toHaveBeenCalledWith(createFinance, { input: finance });
    });
  });
});
