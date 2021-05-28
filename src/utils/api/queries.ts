/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client/core';

export type UserInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}

export const createUserAccount = gql`
  mutation createUser(input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;
