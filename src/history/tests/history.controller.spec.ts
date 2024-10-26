import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from '../history.controller';
import { HistoryService } from '../history.service';

describe('HistoryController', () => {
  let controller: HistoryController;
  let service: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [
        {
          provide: HistoryService,
          useValue: {
            getHistoryByUserId: jest.fn(),
            getAllHistory: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
    service = module.get<HistoryService>(HistoryService);
  });

  it('should return history by user ID', async () => {
    const mockHistory = [{ _id: '1', userId: 'user1', statusCode: 200 }];
    jest.spyOn(service, 'getHistoryByUserId').mockResolvedValue(mockHistory);

    const result = await controller.getUserHistory('user1');
    expect(result).toEqual(mockHistory);
  });

  it('should return all history', async () => {
    const mockHistory = [{ _id: '1', userId: 'user1', statusCode: 200 }];
    jest.spyOn(service, 'getAllHistory').mockResolvedValue(mockHistory);

    const result = await controller.getAllHistory();
    expect(result).toEqual(mockHistory);
  });
});
