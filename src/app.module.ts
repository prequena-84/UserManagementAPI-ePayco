import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { OtpAuthModule } from './common/auth/otp.module';
import { TokenModule } from './common/token/token.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};