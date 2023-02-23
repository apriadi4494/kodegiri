import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { APP_NAME, SWAGGER_URL, SWAGGER_VERSION } from 'src/config/env';

export const setupSwagger = (app) => {
  const docConfig = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`List of API(s) for ${APP_NAME}`)
    .setVersion(SWAGGER_VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);

  SwaggerModule.setup(SWAGGER_URL, app, document);
};
