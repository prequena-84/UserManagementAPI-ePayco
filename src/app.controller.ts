import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1/service/client/welcome')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcome() {
    return {
      message:this.appService.welcome('Bienvenidos a la API de Servicios UserManagement Epayco DEMO 2025'),
    };
  };
};