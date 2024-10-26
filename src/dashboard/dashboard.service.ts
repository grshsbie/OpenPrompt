import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from '../requests/schemas/request.schema';

@Injectable()
export class DashboardService {
  constructor(@InjectModel(Request.name) private requestModel: Model<Request>) {}

  async getDashboardDataByUserId(userId: string): Promise<any> {
    const userRequests = await this.requestModel.find({ userId }).exec();
    return this.generateDashboardData(userRequests);
  }

  async getOverallDashboardData(): Promise<any> {
    const allRequests = await this.requestModel.find().exec();
    return this.generateDashboardData(allRequests);
  }

  private generateDashboardData(requests: Request[]): any {
    const totalRequests = requests.length;
    const successRequests = requests.filter(req => req.statusCode >= 200 && req.statusCode < 300).length;
    const failureRequests = totalRequests - successRequests;
    const averageResponseTime = this.calculateAverageResponseTime(requests);

    return {
      totalRequests,
      successRequests,
      failureRequests,
      averageResponseTime,
    };
  }

  private calculateAverageResponseTime(requests: Request[]): number {
    const totalTime = requests.reduce((sum, req) => sum + (req.createdAt ? new Date(req.createdAt).getTime() : 0), 0);
    return totalTime / requests.length;
  }
}
