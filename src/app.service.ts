import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome(text:string): string {
      return text;
  };
};