import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from '../api.controller';
import { ApiService } from '../api.service';
import { ApiRequestDto } from '../dto/api-request.dto';

describe('ApiController', () => {
  let controller: ApiController;
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        {
          provide: ApiService,
          useValue: {
            makeRequest: jest.fn(),
            getAvailableEndpoints: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ApiController>(ApiController);
    service = module.get<ApiService>(ApiService);
  });

  it('should call ApiService to make request', async () => {
    const mockApiRequest: ApiRequestDto = {
      url: 'http://example.com/api',
      method: 'GET',
      headers: {},
      body: {},
    };

    const mockResponse = { success: true };
    jest.spyOn(service, 'makeRequest').mockResolvedValue(mockResponse);

    const result = await controller.makeApiRequest(mockApiRequest);
    expect(result).toEqual(mockResponse);
  });

  it('should call ApiService to get available endpoints', async () => {
    const mockEndpoints = [
      { name: 'Get User Info', endpoint: '/users/info' },
    ];

    jest.spyOn(service, 'getAvailableEndpoints').mockResolvedValue(mockEndpoints);

    const result = await controller.getAvailableEndpoints();
    expect(result).toEqual(mockEndpoints);
  });
});
