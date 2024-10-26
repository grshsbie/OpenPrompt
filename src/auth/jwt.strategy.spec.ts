import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/user.service';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UsersService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    usersService = module.get<UsersService>(UsersService);
  });

  it('باید کاربر را با payload JWT تأیید کند', async () => {
    const payload = { sub: '123' };
    await jwtStrategy.validate(payload);
    expect(usersService.findById).toHaveBeenCalledWith(payload.sub);
  });
});
