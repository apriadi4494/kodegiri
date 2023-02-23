import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JWT_SECREET } from '../config/env';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECREET,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.id);

    if (!user) throw new UnauthorizedException('User not registered');
    return user;
  }
}
