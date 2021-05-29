import { UserInfo } from '@/models/UserModel';

export interface UserState {
  user: UserInfo | null;
  accessToken: string;
}

export const state: UserState = {
  user: null,
  accessToken: '',
};
