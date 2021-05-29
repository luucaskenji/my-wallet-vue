export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;

  constructor(user: UserInfo, accessToken: string) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.accessToken = accessToken;
  }
}
