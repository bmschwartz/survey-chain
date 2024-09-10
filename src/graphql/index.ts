import fs from 'fs';
import path from 'path';

// Use process.cwd() to resolve the schema path relative to the project root
const schemaPath = path.join(process.cwd(), 'src/graphql/schema.graphql');

// Read the schema.graphql file from the correct path
export const typeDefs = fs.readFileSync(schemaPath, 'utf8');

export * from './resolvers';
