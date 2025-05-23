import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  introspection: true
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
