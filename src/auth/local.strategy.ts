import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = { email, id: 'id_user' };
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
