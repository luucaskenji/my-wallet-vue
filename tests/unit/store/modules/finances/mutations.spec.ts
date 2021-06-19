import { mutations } from '@/store/modules/finances/mutations';
import { FinanceState } from '@/store/modules/finances/state';
import { defaultFinanceInfo } from '../../../mockedEntities';

const { SET_FINANCES } = mutations;

describe('finances module mutations', () => {
  describe('SET_FINANCES', () => {
    it('stores sent finances parameter in state by its ids', () => {
      const state: FinanceState = { finances: {} };
      const finance = defaultFinanceInfo();

      SET_FINANCES(state, [finance]);

      expect(state.finances).toMatchObject({
        [finance.id.toString()]: finance,
      });
    });

    it('early returns if finances parameter does not come as expected', () => {
      const state: FinanceState = { finances: {} };
      const finances = null;

      SET_FINANCES(state, finances);

      expect(state.finances).toEqual({});
    });
  });
});
