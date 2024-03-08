import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUSerDto } from './dto/create.user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
  //crear
  async create(createUserDto: createUSerDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser.save();
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  //update
  async update(id: string, userDto: createUSerDto): Promise<User> {
    if (userDto.password) {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      userDto = ({
        ...userDto,
        password: hashedPassword,
      })
    } try {
      return await this.userModel.findByIdAndUpdate(id, userDto, { new: true })
    } catch (error) {
      throw new NotFoundException('user Not found');
    }
  }
  //delete
  async delete(id: string): Promise<boolean> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) {
        throw new NotFoundException('user Not found');
      }
      return true;
    } catch (err) {
      throw new NotFoundException('user Not found');
    }
  }
}    
