import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import fetch from 'unfetch';

function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  const httpLink = createHttpLink({ uri: process.env.VUE_APP_API_ENDPOINT, fetch: fetch as any });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  }));

  return new ApolloClient<NormalizedCacheObject>({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export async function APIQuery(
  query: DocumentNode,
  variables?: { [key: string]: any },
): Promise<any> {
  const a = getApolloClient();

  return a.query({
    query,
    variables,
  });
}

export async function APIMutation(
  mutation: DocumentNode,
  variables?: { [key: string]: any },
): Promise<any> {
  return getApolloClient().mutate({
    mutation,
    variables,
  });
}
