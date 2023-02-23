import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { ApiResponse } from '../libs/api-responses';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './auth-service';
import { RefreshTokenDto } from './dto/refresh-token-dto';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBaseResponse } from '../commons/swagger/apiBaseResponse';
import { LoginResponse } from './dto/loginResponseDto';

@Controller('auth')
@ApiTags('Auth Services')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @ApiBaseResponse(LoginResponse)
  async login(@Res() res: Response, @Req() req) {
    const user = req.user;
    const { token, refreshToken } = await this.authService.getToken(user.id);

    ApiResponse(res).success({ token, refreshToken });
  }

  @Post('refresh-token')
  @ApiBaseResponse(LoginResponse)
  async refreshToken(@Res() res: Response, @Body() payload: RefreshTokenDto) {
    const { token, refreshToken } = await this.authService.verifyRefreshToken(
      payload,
    );

    ApiResponse(res).success({ token, refreshToken });
  }
}
