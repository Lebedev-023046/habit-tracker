// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { AuthProvider, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  async findAuthAccount(provider: AuthProvider, providerId: string) {
    return this.prisma.authAccount.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async createLocalUser(email: string, passwordHash: string) {
    return this.prisma.user.create({
      data: {
        email,
        role: UserRole.MEMBER,
        authAccounts: {
          create: {
            provider: AuthProvider.LOCAL,
            providerId: email,
            password: passwordHash,
          },
        },
      },
    });
  }

  async createOAuthUser(
    email: string,
    provider: AuthProvider,
    providerId: string,
  ) {
    return this.prisma.user.create({
      data: {
        email,
        role: UserRole.MEMBER,
        authAccounts: {
          create: {
            provider,
            providerId,
          },
        },
      },
    });
  }

  async linkOAuthAccount(
    userId: string,
    provider: AuthProvider,
    providerId: string,
  ) {
    return this.prisma.authAccount.create({
      data: {
        userId,
        provider,
        providerId,
      },
    });
  }

  async createRefreshSession(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    meta?: {
      ip?: string;
      userAgent?: string;
    },
  ) {
    return this.prisma.refreshSession.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
        ip: meta?.ip,
        userAgent: meta?.userAgent,
      },
    });
  }

  async findRefreshSession(tokenHash: string) {
    return this.prisma.refreshSession.findFirst({
      where: {
        tokenHash,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });
  }

  async revokeRefreshSession(sessionId: string) {
    return this.prisma.refreshSession.delete({
      where: { id: sessionId },
    });
  }

  async revokeRefreshSessionByTokenHash(tokenHash: string) {
    return this.prisma.refreshSession.deleteMany({
      where: { tokenHash },
    });
  }

  async revokeAllSessions(userId: string) {
    return this.prisma.refreshSession.deleteMany({
      where: { userId },
    });
  }
}
