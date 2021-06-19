import { UserInfo, UserModel } from '@/models/UserModel';

export const defaultUserInfo = (): UserInfo => ({
  id: 1,
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'test',
});

export const defaultUserModel = (): UserModel => (
  new UserModel(defaultUserInfo(), 'token')
);
