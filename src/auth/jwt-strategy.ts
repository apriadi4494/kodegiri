import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { JWT_SECREET } from '../config/env';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECREET,
    });
  }

  async validate(payload: LoginDto) {
    const user = { ...payload, id: 'id_user' };

    return user;
  }
}
