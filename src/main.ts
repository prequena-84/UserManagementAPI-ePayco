import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'

import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new AllExceptionsFilter())

  app.enableCors({
    origin:'http://localhost:5173',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    Credentials:false,   
  })

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()