import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api', {
  //   exclude: ['/'],
  // });

                                    // Включаем CORS
  app.enableCors({                                                                                                                           
    origin: '*', // Разрешаем доступ с любого домена (лучше указать конкретный)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const config = new DocumentBuilder()    //Swagger
  .setTitle('Не дизайнеры')
  //.setDescription()
  .setVersion('1.0')
  .addBearerAuth()
  .build(); 
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document, {
  swaggerOptions: {
    persistAuthorization: true,
    tagsSorter: 'alpha',
  },
});

  await app.listen(process.env.PORT ?? 5000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}


bootstrap();
