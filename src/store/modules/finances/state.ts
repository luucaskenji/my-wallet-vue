import { FinanceModel } from '@/models';

export interface FinanceState {
  finances: { [key: string]: FinanceModel }
}

export const state: FinanceState = {
  finances: {},
};
