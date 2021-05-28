import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const client = new ApolloClient<NormalizedCacheObject>({
  cache: new InMemoryCache(),
  uri: 'localhost:4000/graphql',
});
