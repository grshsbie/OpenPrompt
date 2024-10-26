import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from '../reports.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from '../../requests/schemas/request.schema';

describe('ReportsService', () => {
  let service: ReportsService;
  let model: Model<Request>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getModelToken(Request.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    model = module.get<Model<Request>>(getModelToken(Request.name));
  });

  it('should generate reports by user ID', async () => {
    const mockRequests = [
      { _id: '1', url: 'http://example.com', method: 'GET', statusCode: 200, createdAt: new Date() },
      { _id: '2', url: 'http://example.com', method: 'POST', statusCode: 500, createdAt: new Date() },
    ];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockRequests),
    } as any);

    const result = await service.getReportsByUserId('user1');
    expect(result).toEqual(expect.any(Array));
    expect(result.length).toBe(2);
  });

  it('should generate overall reports', async () => {
    const mockRequests = [
      { _id: '1', url: 'http://example.com', method: 'GET', statusCode: 200, createdAt: new Date() },
      { _id: '2', url: 'http://example.com', method: 'POST', statusCode: 500, createdAt: new Date() },
    ];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockRequests),
    } as any);

    const result = await service.getAllReports();
    expect(result).toEqual(expect.any(Array));
    expect(result.length).toBe(2);
  });
});
