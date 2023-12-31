import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors();
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('NestJs Role Based Access Control API Project')
      .setDescription(
        'An API for testing Role Based Access Control with passport and JWT',
      )
      .setVersion('1.0')
      .addBearerAuth(
        {
          // I was also testing it without prefix 'Bearer ' before the JWT
          description: `[just text field] Please enter token in following format: Bearer <JWT>`,
          name: 'Authorization',
          bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
          scheme: 'Bearer',
          type: 'http', // I`ve attempted type: 'apiKey' too
          in: 'Header',
        },
        'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        apisSorter: 'alpha',
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });
  }
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(process.env.NODE_PORT || 3000);
  Logger.log(`${await app.getUrl()}`, 'Running at');
}
bootstrap();
