import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from '../requests/schemas/request.schema';
import { ShareRequestDto } from './dto/share-request.dto';

@Injectable()
export class CollaborationService {
  constructor(@InjectModel(Request.name) private requestModel: Model<Request>) {}

  async shareRequest(shareRequestDto: ShareRequestDto): Promise<any> {
    const request = await this.requestModel.findById(shareRequestDto.requestId).exec();
    if (!request) {
      throw new Error('Request not found');
    }

    // Add logic to share the request with other users (e.g., add shared user IDs)
    // Here we're assuming a sharedUsers field exists in the schema
    request.sharedWith = [...(request.sharedWith || []), ...shareRequestDto.sharedWith];
    return request.save();
  }

  async getSharedRequests(userId: string): Promise<Request[]> {
    return this.requestModel.find({ sharedWith: userId }).exec();
  }
}
