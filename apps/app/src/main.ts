import { config, logger } from '@esign-services/logger'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { GlobalExceptionsFilter } from './exceptions/global_exception'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.disable('x-powered-by')
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const httpAdapterHost = app.get(HttpAdapterHost)
  app.useGlobalFilters(new GlobalExceptionsFilter(httpAdapterHost))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS')
    .setDescription('NestJS API Docs')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/specs', app, document)

  const port = config.get('PORT')
  await app.listen(port)
  logger.info(`Listening at http://localhost:${port}/${'api'}`)
}

bootstrap()
