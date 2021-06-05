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
    createSession(input: $input) {
      user {
        id
        firstName
        lastName
      }
      token
    }
  }
`;

export const getFinances = gql`
  query getFinances {
    getFinances {
      id
      value
      description
    }
  }
`;
