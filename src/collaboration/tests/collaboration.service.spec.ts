import { Test, TestingModule } from '@nestjs/testing';
import { CollaborationService } from '../collaboration.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from '../../requests/schemas/request.schema';

describe('CollaborationService', () => {
  let service: CollaborationService;
  let model: Model<Request>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollaborationService,
        {
          provide: getModelToken(Request.name),
          useValue: {
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CollaborationService>(CollaborationService);
    model = module.get<Model<Request>>(getModelToken(Request.name));
  });

  it('should share a request with other users', async () => {
    const mockRequest = {
      _id: '1',
      sharedWith: ['user1'],
      save: jest.fn().mockResolvedValue(true),
    };

    jest.spyOn(model, 'findById').mockResolvedValue(mockRequest as any);

    const result = await service.shareRequest({ requestId: '1', sharedWith: ['user2', 'user3'] });
    expect(result.sharedWith).toContain('user2');
    expect(result.sharedWith).toContain('user3');
  });

  it('should throw an error if the request is not found', async () => {
    jest.spyOn(model, 'findById').mockResolvedValue(null);

    await expect(service.shareRequest({ requestId: 'invalid', sharedWith: ['user2'] }))
      .rejects
      .toThrow('Request not found');
  });

  it('should get shared requests for a user', async () => {
    const mockRequests = [{ _id: '1', sharedWith: ['user1', 'user2'] }];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockRequests),
    } as any);

    const result = await service.getSharedRequests('user2');
    expect(result).toEqual(mockRequests);
  });
});
