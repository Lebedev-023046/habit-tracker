// auth/providers/google-auth.provider.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { GoogleAuthDto } from '../types/auth.dto';

@Injectable()
export class GoogleAuthProvider {
  constructor(private readonly userService: UserService) {}

  async validate(payload: GoogleAuthDto) {
    const { accessToken, timezone } = payload;

    const response = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException('Invalid Google access token');
    }

    const googleUser = await response.json();

    /**
     * googleUser = {
     *   sub: string;
     *   email: string;
     *   email_verified: boolean;
     *   name: string;
     *   picture: string;
     * }
     */

    if (!googleUser.email) {
      throw new UnauthorizedException('Google account has no email');
    }

    return this.userService.findOrCreateOAuthUser({
      provider: 'GOOGLE',
      providerId: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name,
      avatarUrl: googleUser.picture,
      timezone,
    });
  }
}
