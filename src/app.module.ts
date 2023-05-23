import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { RequestsModule } from './modules/requests/requests.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [ClientsModule, RequestsModule, UserModule, AuthModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
