import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('باید کاربر را با ایمیل و رمز عبور تأیید کند', async () => {
    const user = { email: 'test@example.com', password: 'password' };
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user as any);
    const result = await localStrategy.validate('test@example.com', 'password');
    expect(result).toEqual(user);
  });
});
