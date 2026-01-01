import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { AuthFlow } from './types/auth-flow.type';
import { AuthProvider } from './types/auth-provider.type';
import { LoginDto, RegisterDto } from './types/auth.dto';

import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.authenticate({
      provider: AuthProvider.LOCAL,
      flow: AuthFlow.LOGIN,
      payload: dto,
      res,
    });
  }

  @Post('register')
  register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.authenticate({
      provider: AuthProvider.LOCAL,
      flow: AuthFlow.REGISTER,
      payload: dto,
      res,
    });
  }

  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    return this.authService.refresh(refreshToken, res);
  }
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    return this.authService.logout(refreshToken, res);
  }
}
