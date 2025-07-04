import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('UserManagementAPI/V1')
  getWelcome() {
    return {
      message:this.appService.welcome('Bienvenidos a la API de Servicios UserManagement Epayco DEMO 2025'),
    };
  };
};