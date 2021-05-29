export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserState {
  user: UserInfo | null;
  accessToken: string;
}

export const state: UserState = {
  user: null,
  accessToken: '',
};
