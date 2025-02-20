import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { swaggerConfig, swaggerOptions } from '@utils/swagger.config';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser(), compression());
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' })); // Adjust size as needed
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  if (process.env.NODE_ENV === 'development') {
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document, swaggerOptions);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(process.env.NODE_PORT || 3000);
  Logger.log(`${await app.getUrl()}/docs`, 'Swagger running at');
}
bootstrap();
