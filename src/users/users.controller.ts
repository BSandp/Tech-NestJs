import { Controller, Get, Param, Post,  Delete, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import {createUSerDto} from './dto/create.USer.Dto'
/**
 * im
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



//
@Post()
  async create(@Body() createUserDto: createUSerDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
  
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id')id: string,
    @Body() updateUser: createUSerDto,):
    Promise<User> {
    return this.usersService.update(id,updateUser);
  }
  @Delete (':id')
  async delete(@Param('id')id: string): Promise<boolean> {
      return this.usersService.delete(id);
    }
}
