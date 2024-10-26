import { Test, TestingModule } from '@nestjs/testing';
import { CollaborationController } from '../collaboration.controller';
import { CollaborationService } from '../collaboration.service';
import { ShareRequestDto } from '../dto/share-request.dto';

describe('CollaborationController', () => {
  let controller: CollaborationController;
  let service: CollaborationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaborationController],
      providers: [
        {
          provide: CollaborationService,
          useValue: {
            shareRequest: jest.fn(),
            getSharedRequests: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CollaborationController>(CollaborationController);
    service = module.get<CollaborationService>(CollaborationService);
  });

  it('should call CollaborationService to share a request', async () => {
    const mockShareRequestDto: ShareRequestDto = {
      requestId: '1',
      sharedWith: ['user2', 'user3'],
    };
    const mockResponse = { sharedWith: ['user2', 'user3'] };
    jest.spyOn(service, 'shareRequest').mockResolvedValue(mockResponse);

    const result = await controller.shareRequest(mockShareRequestDto);
    expect(result).toEqual(mockResponse);
  });

  it('should call CollaborationService to get shared requests', async () => {
    const mockSharedRequests = [{ _id: '1', sharedWith: ['user2', 'user3'] }];
    jest.spyOn(service, 'getSharedRequests').mockResolvedValue(mockSharedRequests);

    const result = await controller.getSharedRequests('user2');
    expect(result).toEqual(mockSharedRequests);
  });
});
