import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiRequestDto } from './dto/api-request.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('request')
  async makeApiRequest(@Body() apiRequestDto: ApiRequestDto) {
    return this.apiService.makeRequest(apiRequestDto);
  }
}
