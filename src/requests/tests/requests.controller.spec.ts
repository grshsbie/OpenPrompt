import { Test, TestingModule } from '@nestjs/testing';
import { RequestsController } from '../requests.controller';
import { RequestsService } from '../requests.service';
import { CreateRequestDto } from '../dto/create-request.dto';

describe('RequestsController', () => {
  let controller: RequestsController;
  let service: RequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [
        {
          provide: RequestsService,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RequestsController>(RequestsController);
    service = module.get<RequestsService>(RequestsService);
  });

  it('should create a new request', async () => {
    const createRequestDto: CreateRequestDto = {
      userId: '1',
      url: 'http://example.com',
      method: 'GET',
      headers: {},
      body: {},
    };
    const mockRequest = { ...createRequestDto, _id: '1' };
    jest.spyOn(service, 'create').mockResolvedValue(mockRequest);

    const result = await controller.createRequest(createRequestDto);
    expect(result).toEqual(mockRequest);
  });

  it('should get a request by ID', async () => {
    const mockRequest = { _id: '1', userId: '1', url: 'http://example.com', method: 'GET' };
    jest.spyOn(service, 'findById').mockResolvedValue(mockRequest);

    const result = await controller.getRequestById('1');
    expect(result).toEqual(mockRequest);
  });

  it('should get all requests', async () => {
    const mockRequests = [
      { _id: '1', userId: '1', url: 'http://example.com', method: 'GET' },
      { _id: '2', userId: '2', url: 'http://example.com', method: 'POST' },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(mockRequests);

    const result = await controller.getAllRequests();
    expect(result).toEqual(mockRequests);
  });
});
