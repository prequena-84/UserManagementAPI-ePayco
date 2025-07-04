import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { OtpAuthModule } from './common/auth/otp.module';
import { TokenModule } from './common/token/token.module';
import { EmailModule } from './config/email/email.module';
import { SendModule } from './common/utils/email/send.email.module';
import { AuthMiddleware } from './core/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      //envFilePath: '.env.development', // ejemplo si quieres múltiples archivos .env como test, devlopment etc
      isGlobal:true, // Esto hace que el ConfigService esté disponible en TODO el proyecto sin necesidad de exportarlo/importarlo manualmente.
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
      {path:'UserManagementAPI/V1/transactions/confirmation/', method: RequestMethod.POST},
    );
  };
};