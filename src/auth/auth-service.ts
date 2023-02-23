import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_EXPIRES, JWT_EXPIRES_REFRESH_TOKEN } from '../config/env';
import { RefreshTokenDto } from './dto/refresh-token-dto';
import { LoginResponse } from './interfaces/login-response-interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(id: string): Promise<LoginResponse> {
    const token = await this.jwtService.signAsync(
      { id },
      { expiresIn: JWT_EXPIRES },
    );
    const refreshToken = await this.jwtService.signAsync(
      { id },
      { expiresIn: JWT_EXPIRES_REFRESH_TOKEN },
    );

    return { token, refreshToken };
  }

  async verifyRefreshToken(payload: RefreshTokenDto): Promise<LoginResponse> {
    try {
      const verify = await this.jwtService.verify(payload.refreshToken);
      const accessToken = await this.generateToken(verify.id);

      return accessToken;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async getToken(userId: string): Promise<LoginResponse> {
    const accessToken = await this.generateToken(userId);
    return accessToken;
  }
}
