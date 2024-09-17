import fs from 'fs';
import path from 'path';

const schemaPath = path.join(process.cwd(), 'src/graphql/schema.graphql');

export const typeDefs = fs.readFileSync(schemaPath, 'utf8');

export * from './resolvers';
