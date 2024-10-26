import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from '../requests/schemas/request.schema';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Request.name) private requestModel: Model<Request>) {}

  async getReportsByUserId(userId: string): Promise<any[]> {
    const requests = await this.requestModel.find({ userId }).exec();
    return this.generateReports(requests);
  }

  async getAllReports(): Promise<any[]> {
    const requests = await this.requestModel.find().exec();
    return this.generateReports(requests);
  }

  private generateReports(requests: Request[]): any[] {
    // Example report generation logic
    return requests.map((request) => ({
      url: request.url,
      method: request.method,
      statusCode: request.statusCode,
      responseTime: request.createdAt, // Assuming timestamps are enabled
      responseSize: request.response ? request.response.length : 0,
    }));
  }
}
