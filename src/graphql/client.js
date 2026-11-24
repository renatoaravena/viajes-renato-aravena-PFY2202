import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Cliente de Apollo. La URL '/graphql' es interceptada por MSW (backend mock).
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});

export default client;
