import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from '../api.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('ApiService', () => {
  let service: ApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiService,
        {
          provide: HttpService,
          useValue: {
            request: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApiService>(ApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should make API request and return data', async () => {
    const mockResponse: AxiosResponse = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    jest.spyOn(httpService, 'request').mockReturnValue(of(mockResponse));

    const apiRequest = {
      url: 'http://example.com/api',
      method: 'GET',
      headers: {},
      body: {},
    };

    const result = await service.makeRequest(apiRequest);
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw error if request fails', async () => {
    jest.spyOn(httpService, 'request').mockImplementation(() => {
      throw new Error('API request failed');
    });

    const apiRequest = {
      url: 'http://example.com/api',
      method: 'GET',
      headers: {},
      body: {},
    };

    await expect(service.makeRequest(apiRequest)).rejects.toThrow('API request failed');
  });
});
