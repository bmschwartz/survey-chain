import type { Session } from 'next-auth';

export interface GQLContext {
  session: Session;
}
