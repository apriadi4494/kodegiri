import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [],
  providers: [UserService],
  exports: [SequelizeModule, UserService],
})
export class UserModule {}
