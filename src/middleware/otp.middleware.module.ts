import { Module } from '@nestjs/common';
import { OtpMiddlewareService } from './otp.middleware.service';
import { OtpMiddlewareController } from './otp.middleware.controller';

@Module({
  providers: [OtpMiddlewareService],
  controllers: [OtpMiddlewareController]
})
export class OtpMiddlewareModule {}
