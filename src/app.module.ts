import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { OtpAuthModule } from './common/auth/otp.module';
import { TokenModule } from './common/token/token.module';
import { EmailModule } from './config/email/email.module';
import { SendModule } from './common/utils/email/send.email.module';
import { AuthMiddleware } from './core/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal:true, // Esto hace que el ConfigService esté disponible en TODO el proyecto sin necesidad de exportarlo/importarlo manualmente.
      envFilePath:  process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev', // ejemplo si quieres múltiples archivos .env como test, devlopment etc
    }),
    UsersModule,
    TransactionsModule,
    OtpAuthModule,
    TokenModule,
    EmailModule,
    SendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(
      {path:'api/v1/service/transactions/confirmation', method: RequestMethod.POST},
    );
  };
};