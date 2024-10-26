import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: any): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      return null;
    }
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = new this.userModel({ ...createUserDto, password: hashedPassword });
    return newUser.save();
  }

  async recoverPassword(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }
    // اینجا لاجیک ارسال ایمیل بازیابی رمز عبور اضافه می‌شود
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }
}
