import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CollaborationService } from './collaboration.service';
import { ShareRequestDto } from './dto/share-request.dto';

@Controller('collaboration')
export class CollaborationController {
  constructor(private readonly collaborationService: CollaborationService) {}

  @Post('share')
  async shareRequest(@Body() shareRequestDto: ShareRequestDto) {
    return this.collaborationService.shareRequest(shareRequestDto);
  }

  @Get('shared/:userId')
  async getSharedRequests(@Param('userId') userId: string) {
    return this.collaborationService.getSharedRequests(userId);
  }
}
