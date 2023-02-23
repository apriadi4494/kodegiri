/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from '../config/jwt';
import { AuthController } from './auth-controller';
import { AuthService } from './auth-service';
import { JwtStrategy } from './jwt-strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [JwtModule.register(jwtConfig), PassportModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

