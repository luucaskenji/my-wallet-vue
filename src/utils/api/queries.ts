/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const createUserAccount = gql`
  mutation createUser(input: createUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;
