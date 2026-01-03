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
    const existingAccount = await this.userService.findAuthAccount(
      AuthProvider.LOCAL,
      email,
    );

    if (existingAccount) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.userService.createLocalUser(
      email,
      passwordHash,
      timezone,
    );

    return user;
  }
}
