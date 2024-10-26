import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from '../reports.controller';
import { ReportsService } from '../reports.service';

describe('ReportsController', () => {
  let controller: ReportsController;
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: {
            getReportsByUserId: jest.fn(),
            getAllReports: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
    service = module.get<ReportsService>(ReportsService);
  });

  it('should return reports by user ID', async () => {
    const mockReports = [
      { _id: '1', url: 'http://example.com', method: 'GET', statusCode: 200 },
    ];
    jest.spyOn(service, 'getReportsByUserId').mockResolvedValue(mockReports);

    const result = await controller.getUserReports('user1');
    expect(result).toEqual(mockReports);
  });

  it('should return all reports', async () => {
    const mockReports = [
      { _id: '1', url: 'http://example.com', method: 'GET', statusCode: 200 },
    ];
    jest.spyOn(service, 'getAllReports').mockResolvedValue(mockReports);

    const result = await controller.getAllReports();
    expect(result).toEqual(mockReports);
  });
});
