import { JwtPayload } from '@/auth/types/jwt-payload.type';

declare global {
  namespace Express {
    interface User extends JwtPayload {}
  }
}
