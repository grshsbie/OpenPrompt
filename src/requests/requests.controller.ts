import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post('create')
  async createRequest(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Get(':id')
  async getRequestById(@Param('id') id: string) {
    return this.requestsService.findById(id);
  }

  @Get()
  async getAllRequests() {
    return this.requestsService.findAll();
  }
}
