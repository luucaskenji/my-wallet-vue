import { FinanceInfo } from '@/models';

export interface FinanceState {
  finances: { [key: string]: FinanceInfo }
}

export const state: FinanceState = {
  finances: {},
};
