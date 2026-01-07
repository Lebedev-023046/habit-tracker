// src/auth/providers/register-auth.provider.ts

import { ConflictException, Injectable } from '@nestjs/common';
import { AuthProvider, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';
import { RegisterDto } from '../types/auth.dto';
import { IdentityProvider } from './auth-provider.interface';

@Injectable()
export class RegisterAuthProvider implements IdentityProvider<RegisterDto> {
  constructor(private readonly userService: UserService) {}

  async validate({ email, password, timezone }: RegisterDto): Promise<User> {
    const existingUser = await this.userService.findByEmail(email);
    const passwordHash = await bcrypt.hash(password, 10);

    if (existingUser) {
      const hasLocalAuth = await this.userService.hasAuthAccount(
        existingUser.id,
        AuthProvider.LOCAL,
      );
      if (hasLocalAuth) {
        throw new ConflictException(
          'This email is already registered. Try signing in instead.',
        );
      }

      await this.userService.attachLocalAuth(
        existingUser.id,
        passwordHash,
        email,
      );

      return existingUser;
    }

    return this.userService.createLocalUser(email, passwordHash, timezone);
  }
}
