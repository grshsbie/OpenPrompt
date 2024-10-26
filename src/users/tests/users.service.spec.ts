import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should create a new user', async () => {
    const createUserDto = { email: 'test@example.com', password: 'password', firstName: 'Test', lastName: 'User' };
    const mockUser = { ...createUserDto, _id: '1', password: 'hashedpassword' };
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');
    jest.spyOn(model, 'create').mockResolvedValue(mockUser as any);

    const result = await service.create(createUserDto);
    expect(result).toEqual(mockUser);
  });

  it('should find a user by email', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedpassword' };
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    } as any);

    const user = await service.findByEmail('test@example.com');
    expect(user).toBeDefined();
    expect(user.email).toEqual('test@example.com');
  });
});
