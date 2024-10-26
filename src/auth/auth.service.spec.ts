import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('باید کاربر را تأیید کند', async () => {
    const user = { email: 'test@example.com', password: 'password' };
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user as any);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    const result = await authService.validateUser('test@example.com', 'password');
    expect(result).toEqual(user);
  });

  it('باید توکن JWT تولید کند', async () => {
    const user = { _id: '123', email: 'test@example.com' };
    await authService.login(user);
    expect(jwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user._id });
  });
});
