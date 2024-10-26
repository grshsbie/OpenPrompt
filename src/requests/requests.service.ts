import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from './schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestsService {
  constructor(@InjectModel(Request.name) private requestModel: Model<Request>) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const createdRequest = new this.requestModel(createRequestDto);
    return createdRequest.save();
  }

  async findById(id: string): Promise<Request | undefined> {
    return this.requestModel.findById(id).exec();
  }

  async findAll(): Promise<Request[]> {
    return this.requestModel.find().exec();
  }
}
