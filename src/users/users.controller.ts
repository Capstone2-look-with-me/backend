import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: CreateUserDto })

  @ResponseMessage("Create a new user")
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto
  ) {

    let newUser = await this.usersService.create(createUserDto);
    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt
    }
  }

  @Get()
  @ResponseMessage('Fetch List User with paginate')
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @Get(':id')
  @ResponseMessage("Fetch user by id")
  async findOne(@Param('id') id: string) {
    const foundUser = await this.usersService.findOne(id)
    return foundUser
  }

  @ResponseMessage("Update a User")
  @Patch()
  update(@Body() updateUserDto) {
    return this.usersService.update(updateUserDto, );
  }

  @ResponseMessage("Delete a User")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

 
}
