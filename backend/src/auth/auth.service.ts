import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

import { SessionService } from './session.service';

import { LocalAuthProvider } from './providers/local-auth.provider';
import { RegisterAuthProvider } from './providers/register-auth.provider';
// import { GoogleAuthProvider } from './providers/google-auth.provider';

import { UserService } from 'src/user/user.service';
import { AuthFlow, AuthProvider } from './types/auth-provider.type';

import { User } from '@prisma/client';
import { addDays } from 'date-fns';
import { LoginDto, RegisterDto } from './types/auth.dto';

type Payload = {
  email: string;
  password: string;
  timezone?: string;
};

interface AuthenticateProps {
  provider: AuthProvider;
  flow: AuthFlow;
  payload: Payload;
  res: Response;
}

interface ResolveIdentityProps {
  provider: AuthProvider;
  flow: AuthFlow;
  payload: Payload;
}

type AuthPayloadMap = {
  [AuthFlow.LOGIN]: LoginDto;
  [AuthFlow.REGISTER]: RegisterDto;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,

    private readonly localProvider: LocalAuthProvider,
    private readonly registerProvider: RegisterAuthProvider,
    // private readonly googleProvider: GoogleAuthProvider,
  ) {}

  async authenticate({ payload, provider, flow, res }: AuthenticateProps) {
    const user = await this.resolveIdentity({ payload, provider, flow });

    const { accessToken, refreshTokenHash, refreshTokenExpiresIn } =
      await this.sessionService.issueSession(user, res);

    await this.userService.createRefreshSession(
      user.id,
      refreshTokenHash,
      this.calculateRefreshExpiresAt(refreshTokenExpiresIn),
    );

    return { accessToken };
  }

  async refresh(refreshToken: string, res: Response) {
    const tokenHash = this.sessionService.hashRefreshToken(refreshToken);

    // 1️⃣ ищем активную refresh session
    const session = await this.userService.findRefreshSession(tokenHash);

    if (!session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = session.user;

    const { accessToken, refreshTokenHash, refreshTokenExpiresIn } =
      await this.sessionService.issueSession(user, res);

    await this.userService.revokeRefreshSession(session.id);

    await this.userService.createRefreshSession(
      user.id,
      refreshTokenHash,
      this.calculateRefreshExpiresAt(refreshTokenExpiresIn),
    );

    return { accessToken };
  }

  async logout(refreshToken: string, res: Response) {
    const tokenHash = this.sessionService.hashRefreshToken(refreshToken);
    await this.userService.revokeRefreshSessionByTokenHash(tokenHash);

    this.clearRefreshCookie(res);

    return { success: true };
  }

  private clearRefreshCookie(res: Response) {
    res.clearCookie('refreshToken', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  private async resolveIdentity({
    payload,
    provider,
    flow,
  }: ResolveIdentityProps) {
    const resolver = this.identityResolvers[provider]?.[flow];

    if (!resolver) {
      throw new UnauthorizedException('Unsupported auth flow');
    }

    return resolver(payload);
  }

  private readonly identityResolvers: Record<
    AuthProvider,
    Partial<
      Record<AuthFlow, (payload: AuthPayloadMap[AuthFlow]) => Promise<User>>
    >
  > = {
    [AuthProvider.LOCAL]: {
      [AuthFlow.LOGIN]: (payload) => this.localProvider.validate(payload),
      [AuthFlow.REGISTER]: (payload) => this.registerProvider.validate(payload),
    },

    // GOOGLE не зависит от flow
    [AuthProvider.GOOGLE]: {
      // [AuthFlow.LOGIN]: payload => this.googleProvider.validate(payload),
      // [AuthFlow.REGISTER]: payload => this.googleProvider.validate(payload),
    },
  };
  private calculateRefreshExpiresAt(expiresIn: string): Date {
    // expiresIn: '7d'
    const days = Number(expiresIn.replace('d', ''));
    return addDays(new Date(), days);
  }
}
