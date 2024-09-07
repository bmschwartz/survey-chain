import fs from 'fs';
import path from 'path';

import mutations from './mutations';
import queries from './queries';

// Load the base types and schema definitions from schema.graphql
const schemaPath = path.join(__dirname, 'schema.graphql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Combine the schema with the loaded queries and mutations
export const typeDefs = `
  ${schema}
  ${queries}
  ${mutations}
`;

export * from './resolvers';
