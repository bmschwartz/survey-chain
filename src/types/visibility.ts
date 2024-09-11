// types/visibility.ts
import { Visibility as GQLVisibility } from '@/graphql/__generated__/graphql';

export enum Visibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export const transformVisibility = (graphqlVisibility?: GQLVisibility): Visibility | undefined => {
  return graphqlVisibility ? (graphqlVisibility as Visibility) : undefined;
};
