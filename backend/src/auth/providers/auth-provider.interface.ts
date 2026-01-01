// src/auth/providers/auth-provider.interface.ts

import { User } from '@prisma/client';

export interface IdentityProvider<TPayload> {
  validate(payload: TPayload): Promise<User>;
}
