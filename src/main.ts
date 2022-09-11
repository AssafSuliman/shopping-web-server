import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4000',
    credentials: true
  });
  app.use(cookieParser())
  app.use(
    session({
      secret: 'fdvremklm',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge:5000000
      },
      name:'SuliTools'
    }),
  );
  await app.listen(3000);
}
bootstrap();
