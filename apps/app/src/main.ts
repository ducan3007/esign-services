/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { logger } from '@esign-services/logger'
import { config } from '@esign-services/logger'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS')
    .setDescription('NestJS API Docs')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/specs', app, document)

  const port = config.get('PORT')
  await app.listen(port)

  logger.info(`Listening at http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
