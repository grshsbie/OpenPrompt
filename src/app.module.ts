import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuåthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApiModule } from './api/api.module';
import { RequestsModule } from './requests/requests.module';
import { HistoryModule } from './history/history.module';
import { ReportsModule } from './reports/reports.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CollaborationModule } from './collaboration/collaboration.module';
import { join } from 'path';
import { AppController } from './ app.controller';


@Module({
  imports: [
    MongooseModule.forRoot('', {
      connectTimeoutMS: 30000,
      serverSelectionTimeoutMS: 60000,
    }),
    AuthModule,
    UsersModule,
    ApiModule,
    RequestsModule,
    HistoryModule,
    ReportsModule,
    DashboardModule,
    CollaborationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
