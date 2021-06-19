import {
  FinanceInfo,
  FinanceModel,
  UserInfo,
  UserModel,
} from '@/models';

export const defaultUserInfo = (): UserInfo => ({
  id: 1,
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'test',
});

export const defaultUserModel = (): UserModel => (
  new UserModel(defaultUserInfo(), 'token')
);

export const defaultFinanceInfo = (): FinanceInfo => ({
  id: 1,
  value: '12,60',
  description: 'test',
  type: 'INCOME',
});

export const defaultFinanceModel = (): FinanceModel => (
  new FinanceModel(defaultFinanceInfo())
);
