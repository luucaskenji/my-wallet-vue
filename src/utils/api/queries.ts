import { gql } from '@apollo/client/core';

// queries types identifiers
export type UserInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}

export type SignInInput = {
  email: string;
  password: string;
}

export const createUserAccount = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const signIn = gql`
  mutation createSession($input: SignInInput) {
    user
    token
  }
`;
