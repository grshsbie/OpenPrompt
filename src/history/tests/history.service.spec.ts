import { Test, TestingModule } from '@nestjs/testing';
import { HistoryService } from '../history.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from '../../requests/schemas/request.schema';

describe('HistoryService', () => {
  let service: HistoryService;
  let model: Model<Request>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: getModelToken(Request.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
    model = module.get<Model<Request>>(getModelToken(Request.name));
  });

  it('should get request history by user ID', async () => {
    const mockHistory = [{ _id: '1', userId: 'user1', statusCode: 200 }];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockHistory),
    } as any);

    const result = await service.getHistoryByUserId('user1');
    expect(result).toEqual(mockHistory);
  });

  it('should get all request history', async () => {
    const mockHistory = [{ _id: '1', userId: 'user1', statusCode: 200 }];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockHistory),
    } as any);

    const result = await service.getAllHistory();
    expect(result).toEqual(mockHistory);
  });
});
