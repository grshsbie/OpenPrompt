import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: any) {
    const result = await this.userService.create(createUserDto);
    if (!result) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return {
      message: 'User registered successfully',
      userId: result._id,
    };
  }

  @Post('recover-password')
  async recoverPassword(@Body() body: any) {
    const { email } = body;
    const result = await this.userService.recoverPassword(email);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Password recovery email sent',
    };
  }
}
