import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            recoverPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('register', () => {
    it('باید کاربر را ثبت‌نام کند', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password' };
      jest.spyOn(userService, 'create').mockResolvedValue({
        _id: '123',
        email: 'test@example.com',
        password: 'hashedPassword',
      });

      const result = await userController.register(createUserDto);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual({
        message: 'User registered successfully',
        userId: '123',
      });
    });

    it('باید خطای کاربر موجود را برگرداند', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password' };
      jest.spyOn(userService, 'create').mockResolvedValue(null);

      try {
        await userController.register(createUserDto);
      } catch (e) {
        expect(e.status).toEqual(400);
        expect(e.response).toEqual('User already exists');
      }
    });
  });

  describe('recoverPassword', () => {
    it('باید ایمیل بازیابی رمز عبور ارسال کند', async () => {
      const email = 'test@example.com';
      jest.spyOn(userService, 'recoverPassword').mockResolvedValue(true);

      const result = await userController.recoverPassword({ email });
      expect(userService.recoverPassword).toHaveBeenCalledWith(email);
      expect(result).toEqual({
        message: 'Password recovery email sent',
      });
    });

    it('باید خطای "کاربر پیدا نشد" برگرداند', async () => {
      const email = 'test@example.com';
      jest.spyOn(userService, 'recoverPassword').mockResolvedValue(null);

      try {
        await userController.recoverPassword({ email });
      } catch (e) {
        expect(e.status).toEqual(404);
        expect(e.response).toEqual('User not found');
      }
    });
  });
});
