import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

  it('should validate user and return user data without password', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedpassword' };
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const user = await authService.validateUser('test@example.com', 'password');
    expect(user).toBeDefined();
    expect(user.email).toEqual('test@example.com');
  });

  it('should return null if password does not match', async () => {
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue({ email: 'test@example.com', password: 'hashedpassword' });
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    const user = await authService.validateUser('test@example.com', 'wrongpassword');
    expect(user).toBeNull();
  });

  it('should generate JWT token on login', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedpassword' };
    const mockJwtToken = 'test-jwt-token';
    jest.spyOn(jwtService, 'sign').mockReturnValue(mockJwtToken);

    const result = await authService.login(mockUser);
    expect(result.access_token).toBe(mockJwtToken);
  });
});
