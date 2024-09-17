import { User as GQLUser } from '@/graphql/__generated__/graphql';

export interface User {
  id: string; // Required
  displayName?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const transformUser = (graphqlUser: GQLUser): User => ({
  id: graphqlUser.id,
  displayName: graphqlUser.displayName,
  email: graphqlUser.email,
  createdAt: graphqlUser.createdAt,
  updatedAt: graphqlUser.updatedAt,
});
