import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  const server = app.getHttpAdapter().getInstance();
  server.set('trust proxy', 1);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(PORT, '0.0.0.0');

  console.log(`✅ SERVER STARTED ON PORT: ${PORT}`);

  process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received');
    await app.close();
    process.exit(0);
  });
}
bootstrap();
