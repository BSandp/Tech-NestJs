import { Injectable } from '@nestjs/common';
import {User} from './users.entity';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {createUSerDto } from './dto/create.user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {} 
  //actualizar
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
}    
