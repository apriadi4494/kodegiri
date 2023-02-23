import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_SECREET } from './env';

export const jwtConfig: JwtModuleOptions = {
  secret: JWT_SECREET,
};
