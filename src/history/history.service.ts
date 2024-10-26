import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from '../requests/schemas/request.schema';

@Injectable()
export class HistoryService {
  constructor(@InjectModel(Request.name) private requestModel: Model<Request>) {}

  async getHistoryByUserId(userId: string): Promise<Request[]> {
    return this.requestModel.find({ userId }).exec();
  }

  async getAllHistory(): Promise<Request[]> {
    return this.requestModel.find().exec();
  }
}
