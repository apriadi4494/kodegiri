import { MiddlewareConsumer, Module, ModuleMetadata } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './commons/interceptors/httpExceptionFilter';
import { LoggerMiddleware } from './commons/logger/loggerMiddleware';

const metaData: ModuleMetadata = {
  imports: [AuthModule],
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
