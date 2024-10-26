import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  describe('create', () => {
    it('باید کاربر جدید را ایجاد کند', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password' };
      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hashSync').mockReturnValue(hashedPassword);
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(userModel.prototype, 'save').mockResolvedValue({
        _id: '123',
        email: createUserDto.email,
        password: hashedPassword,
      });

      const result = await userService.create(createUserDto);
      expect(bcrypt.hashSync).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(result).toEqual({
        _id: '123',
        email: createUserDto.email,
        password: hashedPassword,
      });
    });

    it('باید null برگرداند اگر کاربر قبلاً وجود داشته باشد', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue({
        _id: '123',
        email: 'test@example.com',
        password: 'hashedPassword',
      });

      const createUserDto = { email: 'test@example.com', password: 'password' };
      const result = await userService.create(createUserDto);
      expect(result).toBeNull();
    });
  });

  describe('recoverPassword', () => {
    it('باید بازیابی رمز عبور را برای کاربر پیدا شده انجام دهد', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue({
        _id: '123',
        email: 'test@example.com',
      });

      const result = await userService.recoverPassword('test@example.com');
      expect(result).toEqual({
        _id: '123',
        email: 'test@example.com',
      });
    });

    it('باید null برگرداند اگر کاربر پیدا نشود', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      const result = await userService.recoverPassword('test@example.com');
      expect(result).toBeNull();
    });
  });
});
