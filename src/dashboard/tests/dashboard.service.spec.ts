import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from '../dashboard.service';
import { getModelToken } from '@nestjs/mongoose';
import { Request } from '../../requests/schemas/request.schema';
import { Model } from 'mongoose';

describe('DashboardService', () => {
  let service: DashboardService;
  let model: Model<Request>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getModelToken(Request.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    model = module.get<Model<Request>>(getModelToken(Request.name));
  });

  it('should return dashboard data for a specific user', async () => {
    const mockRequests = [
      { _id: '1', statusCode: 200, createdAt: new Date() },
      { _id: '2', statusCode: 500, createdAt: new Date() },
    ];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockRequests),
    } as any);

    const result = await service.getDashboardDataByUserId('user1');
    expect(result.totalRequests).toBe(2);
    expect(result.successRequests).toBe(1);
    expect(result.failureRequests).toBe(1);
  });

  it('should return overall dashboard data', async () => {
    const mockRequests = [
      { _id: '1', statusCode: 200, createdAt: new Date() },
      { _id: '2', statusCode: 500, createdAt: new Date() },
    ];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockRequests),
    } as any);

    const result = await service.getOverallDashboardData();
    expect(result.totalRequests).toBe(2);
    expect(result.successRequests).toBe(1);
    expect(result.failureRequests).toBe(1);
  });

  it('should calculate average response time', () => {
    const mockRequests = [
      { _id: '1', createdAt: new Date('2024-01-01T00:00:00Z') },
      { _id: '2', createdAt: new Date('2024-01-01T00:01:00Z') },
    ];

    const result = service['calculateAverageResponseTime'](mockRequests);
    expect(result).toBeGreaterThan(0);
  });
});
