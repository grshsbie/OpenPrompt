import { Module } from '@nestjs/common';
import { CollaborationService } from './collaboration.service';
import { CollaborationController } from './collaboration.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from '../requests/schemas/request.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }])],
  controllers: [CollaborationController],
  providers: [CollaborationService],
})
export class CollaborationModule {}
