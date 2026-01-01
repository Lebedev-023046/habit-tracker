import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthProvider } from './providers/local-auth.provider';
import { RegisterAuthProvider } from './providers/register-auth.provider';
import { SessionService } from './session.service';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({ global: true })],

  controllers: [AuthController],
  providers: [
    AuthService,
    SessionService,
    LocalAuthProvider,
    RegisterAuthProvider,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
