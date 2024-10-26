import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

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

  it('should call AuthService login and return JWT token', async () => {
    const mockJwtToken = { access_token: 'test-jwt-token' };
    jest.spyOn(authService, 'login').mockResolvedValue(mockJwtToken);

    const result = await authController.login({ user: { email: 'test@example.com', password: 'password' } });
    expect(result).toEqual(mockJwtToken);
  });

  it('should call AuthService register and return success message', async () => {
    const mockUser: CreateUserDto = { email: 'test@example.com', password: 'password', firstName: 'Test', lastName: 'User' };
    const mockResponse = { message: 'User registered successfully' };
    jest.spyOn(authService, 'register').mockResolvedValue(mockResponse);

    const result = await authController.register(mockUser);
    expect(result).toEqual(mockResponse);
  });
});
