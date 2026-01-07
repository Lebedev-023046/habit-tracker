import { Optional } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @Optional()
  @IsString()
  timezone?: string;
}

export class GoogleAuthDto {
  @IsString()
  accessToken: string;

  @IsString()
  timezone?: string;
}
