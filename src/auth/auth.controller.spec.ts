import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('باید کاربر را وارد کند', async () => {
    const loginDto = { email: 'test@example.com', password: 'password' };
    await authController.login(loginDto);
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  });

  it('باید کاربر را ثبت‌نام کند', async () => {
    const registerDto = { email: 'test@example.com', password: 'password' };
    await authController.register(registerDto);
    expect(authService.register).toHaveBeenCalledWith(registerDto);
  });
});
