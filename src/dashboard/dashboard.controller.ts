import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get(':userId')
  async getUserDashboard(@Param('userId') userId: string) {
    return this.dashboardService.getDashboardDataByUserId(userId);
  }

  @Get()
  async getOverallDashboard() {
    return this.dashboardService.getOverallDashboardData();
  }
}
