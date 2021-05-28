// Needed for queries returns
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';

const client = new ApolloClient<NormalizedCacheObject>({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
});

export async function APIQuery(
  query: DocumentNode,
  variables?: { [key: string]: any },
): Promise<any> {
  return client.query({
    query,
    variables,
  });
}

export async function APIMutation(
  mutation: DocumentNode,
  variables?: { [key: string]: any },
): Promise<any> {
  return client.mutate({
    mutation,
    variables,
  });
}
