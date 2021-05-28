/* eslint-disable @typescript-eslint/no-explicit-any */ // Needed for queries returns

import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

const client = new ApolloClient<NormalizedCacheObject>({
  cache: new InMemoryCache(),
  uri: 'localhost:4000/graphql',
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
