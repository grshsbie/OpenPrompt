import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
      firstName: 'Test',
      lastName: 'User',
    };
    const mockUser = { ...createUserDto, _id: '1', password: 'hashedpassword' };
    jest.spyOn(service, 'create').mockResolvedValue(mockUser);

    const result = await controller.create(createUserDto);
    expect(result).toEqual(mockUser);
  });

  it('should get a user by ID', async () => {
    const mockUser = { _id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', password: 'hashedpassword' };
    jest.spyOn(service, 'findById').mockResolvedValue(mockUser);

    const result = await controller.findOne('1');
    expect(result).toEqual(mockUser);
  });
});
