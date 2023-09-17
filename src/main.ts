import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import compression from '@fastify/compress';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	app.setGlobalPrefix('/api');

	app.enableCors({
		credentials: true,
		maxAge: 40,
		origin: process.env.WEB_URL,
		allowedHeaders: ['Content-Type', 'Authorization'],
		methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PATCH'],
	});

	await app.register(compression);
	await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
}

bootstrap();