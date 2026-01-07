// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { AuthProvider, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type OAuthUserPayload = {
  provider: AuthProvider;
  providerId: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  timezone?: string;
};

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

  async attachLocalAuth(userId: string, passwordHash: string, email: string) {
    return this.prisma.authAccount.create({
      data: {
        userId,
        provider: AuthProvider.LOCAL,
        providerId: email,
        password: passwordHash,
      },
    });
  }

  async hasAuthAccount(
    userId: string,
    provider: AuthProvider,
  ): Promise<boolean> {
    const count = await this.prisma.authAccount.count({
      where: {
        userId,
        provider,
      },
    });

    return count > 0;
  }

  async createLocalUser(
    email: string,
    passwordHash: string,
    timezone?: string,
  ) {
    return this.prisma.user.create({
      data: {
        email,
        role: UserRole.MEMBER,
        timezone: timezone ?? 'UTC',
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

  async findOrCreateOAuthUser({
    provider,
    providerId,
    email,
    timezone,
  }: OAuthUserPayload) {
    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Ищем OAuth-аккаунт
      const oauthAccount = await tx.authAccount.findUnique({
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

      if (oauthAccount) {
        return oauthAccount.user;
      }

      // 2️⃣ Ищем пользователя по email
      const existingUser = await tx.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // 3️⃣ Привязываем OAuth к существующему пользователю
        await tx.authAccount.create({
          data: {
            provider,
            providerId,
            userId: existingUser.id,
          },
        });

        return existingUser;
      }

      // 4️⃣ Создаём нового пользователя + OAuth
      return tx.user.create({
        data: {
          email,
          timezone: timezone ?? 'UTC',
          authAccounts: {
            create: {
              provider,
              providerId,
            },
          },
        },
      });
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
    return this.prisma.refreshSession.deleteMany({
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
