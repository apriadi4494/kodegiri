import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { LoginDto } from '../../auth/dto/login-dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ where: { id } });
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async validateUser(payload: LoginDto): Promise<User> {
    const { email, password } = payload;

    try {
      const user = await this.userModel.findOne({
        where: { email: { [Op.iLike]: email } },
      });

      const validatePassword = user
        ? await user.validatePassword(password)
        : false;

      if (!validatePassword)
        throw new UnauthorizedException('Incorrect email or password');

      return user;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
