import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { auth } from '@/auth';
import { resolvers, typeDefs } from '@/graphql';
import { prisma } from '@/services/prisma';

const schema = makeExecutableSchema({ typeDefs, resolvers });
const apolloServer = new ApolloServer({ schema });

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, session: await auth(), prisma }),
});
