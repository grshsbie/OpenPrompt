import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from '../requests.service';
import { getModelToken } from '@nestjs/mongoose';
import { Request } from '../schemas/request.schema';
import { Model } from 'mongoose';

describe('RequestsService', () => {
  let service: RequestsService;
  let model: Model<Request>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsService,
        {
          provide: getModelToken(Request.name),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
    model = module.get<Model<Request>>(getModelToken(Request.name));
  });

  it('should create a new request', async () => {
    const createRequestDto = { userId: '1', url: 'http://example.com', method: 'GET', headers: {}, body: {} };
    const mockRequest = { ...createRequestDto, _id: '1' };
    jest.spyOn(model, 'create').mockResolvedValue(mockRequest as any);

    const result = await service.create(createRequestDto);
    expect(result).toEqual(mockRequest);
  });

  it('should get a request by ID', async () => {
    const mockRequest = { _id: '1', userId: '1', url: 'http://example.com', method: 'GET' };
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockRequest),
    } as any);

    const result = await service.findById('1');
    expect(result).toEqual(mockRequest);
  });

  it('should get all requests', async () => {
    const mockRequests = [
      { _id: '1', userId: '1', url: 'http://example.com', method: 'GET' },
      { _id: '2', userId: '2', url: 'http://example.com', method: 'POST' },
    ];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockRequests),
    } as any);

    const result = await service.findAll();
    expect(result).toEqual(mockRequests);
  });
});
