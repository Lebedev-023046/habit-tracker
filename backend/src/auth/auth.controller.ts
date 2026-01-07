import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthFlow } from './types/auth-flow.type';
import { AuthProvider } from './types/auth-provider.type';
import { GoogleAuthDto, LoginDto, RegisterDto } from './types/auth.dto';

import { Public } from 'src/common/decorators/public.decorator';
import { ResponseUtil } from 'src/common/utils/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // =========================
  // GOOGLE OAuth
  // =========================
  @Public()
  @Post('google')
  async googleAuth(
    @Body() dto: GoogleAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.authenticate({
      provider: AuthProvider.GOOGLE,
      flow: AuthFlow.LOGIN,
      payload: dto,
      res,
    });

    return ResponseUtil.success<{ accessToken: string }>({
      accessToken,
    });
  }

  // =========================
  // LOGIN
  // =========================
  @Public()
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.authenticate({
      provider: AuthProvider.LOCAL,
      flow: AuthFlow.LOGIN,
      payload: dto,
      res,
    });

    return ResponseUtil.success<{ accessToken: string }>({
      accessToken,
    });
  }

  // =========================
  // REGISTER
  // =========================
  @Public()
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.authenticate({
      provider: AuthProvider.LOCAL,
      flow: AuthFlow.REGISTER,
      payload: dto,
      res,
    });

    return ResponseUtil.success<{ accessToken: string }>({
      accessToken,
    });
  }

  // =========================
  // REFRESH
  // =========================
  @Public()
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const { accessToken } = await this.authService.refresh(refreshToken, res);

    return ResponseUtil.success<{ accessToken: string }>({
      accessToken,
    });
  }

  // =========================
  // LOGOUT
  // =========================
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    await this.authService.logout(refreshToken, res);

    return ResponseUtil.success<{ success: boolean }>({ success: true });
  }
}
