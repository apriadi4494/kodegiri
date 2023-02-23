import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './commons/swagger';

import { APP_PORT } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  await app.listen(APP_PORT);
}

bootstrap();
