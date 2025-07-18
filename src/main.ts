import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'

import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new AllExceptionsFilter())

  app.enableCors({
    origin:[
      // Se agregan las Excepciones de los Endpoint que realizan la peticiones, aqui se pueden configurar las API que pueden ofrecer datos.
      'http://localhost:5173',
      'http://localhost:4173',
    ],
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    Credentials:false,   
  })

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()