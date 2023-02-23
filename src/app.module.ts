import { MiddlewareConsumer, Module, ModuleMetadata } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './commons/interceptors/httpExceptionFilter';
import { LoggerMiddleware } from './commons/logger/loggerMiddleware';
import database from './config/database';
import { UserModule } from './modules/user/user.modules';

const metaData: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        database(configService),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
};

@Module(metaData)
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
