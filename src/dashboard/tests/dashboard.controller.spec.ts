import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from '../dashboard.controller';
import { DashboardService } from '../dashboard.service';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: {
            getDashboardDataByUserId: jest.fn(),
            getOverallDashboardData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  it('should call DashboardService to get user dashboard data', async () => {
    const mockData = {
      totalRequests: 10,
      successRequests: 7,
      failureRequests: 3,
      averageResponseTime: 500,
    };
    jest.spyOn(service, 'getDashboardDataByUserId').mockResolvedValue(mockData);

    const result = await controller.getUserDashboard('user1');
    expect(result).toEqual(mockData);
  });

  it('should call DashboardService to get overall dashboard data', async () => {
    const mockData = {
      totalRequests: 100,
      successRequests: 80,
      failureRequests: 20,
      averageResponseTime: 400,
    };
    jest.spyOn(service, 'getOverallDashboardData').mockResolvedValue(mockData);

    const result = await controller.getOverallDashboard();
    expect(result).toEqual(mockData);
  });
});
