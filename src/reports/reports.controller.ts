import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(':userId')
  async getUserReports(@Param('userId') userId: string) {
    return this.reportsService.getReportsByUserId(userId);
  }

  @Get()
  async getAllReports() {
    return this.reportsService.getAllReports();
  }
}
