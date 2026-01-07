// auth-payload.types.ts

import { AuthFlow, AuthProvider } from './auth-provider.type';
import { GoogleAuthDto, LoginDto, RegisterDto } from './auth.dto';

export type AuthPayloadByProvider = {
  [AuthProvider.LOCAL]: {
    [AuthFlow.LOGIN]: LoginDto;
    [AuthFlow.REGISTER]: RegisterDto;
  };

  [AuthProvider.GOOGLE]: {
    [AuthFlow.LOGIN]: GoogleAuthDto;
    [AuthFlow.REGISTER]: GoogleAuthDto;
  };
};
