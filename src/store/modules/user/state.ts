interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  user: UserInfo | null;
  accessToken: string;
}

const state: UserState = {
  user: null,
  accessToken: '',
};

export default state;
