import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
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
  .setExternalDoc('Postman Collection', '/docs-json')
  .build();

export const swaggerOptions = {
  swaggerOptions: {
    apisSorter: 'alpha',
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
  },
};

export default swaggerConfig;
