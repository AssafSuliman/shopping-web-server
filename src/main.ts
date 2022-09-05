import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3100',
    credentials: true
  });
  app.use(
    session({
      secret: 'fdvremklm',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge:50000
      },
      name:'SuliTools'
    }),
  );
  await app.listen(3000);
}
bootstrap();
