import { getters } from '@/store/modules/finances/getters';
import { FinanceState } from '@/store/modules/finances/state';
import { defaultFinanceInfo, defaultFinanceModel } from '../../../mockedEntities';

const { finances } = getters;

describe('finances module getters', () => {
  describe('finances', () => {
    it('returns stored finances as Finance Model instances', () => {
      const storedFinance = defaultFinanceInfo();
      const state: FinanceState = {
        finances: {
          [storedFinance.id.toString()]: storedFinance,
        },
      };

      const financesModels = finances(state, {}, {}, {});

      expect(financesModels).toEqual([defaultFinanceModel()]);
    });
  });
});
