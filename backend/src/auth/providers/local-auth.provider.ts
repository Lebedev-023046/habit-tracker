// src/auth/providers/local-auth.provider.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthProvider, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { LoginDto } from '../types/auth.dto';
import { IdentityProvider } from './auth-provider.interface';

@Injectable()
export class LocalAuthProvider implements IdentityProvider<LoginDto> {
  constructor(private readonly userService: UserService) {}

  async validate({ email, password }: LoginDto): Promise<User> {
    const authAccount = await this.userService.findAuthAccount(
      AuthProvider.LOCAL,
      email,
    );

    if (!authAccount || !authAccount.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      authAccount.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return authAccount.user;
  }
}
