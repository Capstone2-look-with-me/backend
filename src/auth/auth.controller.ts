import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { IUser } from 'src/users/users.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, RegisterUserDto, UserLoginDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';

@ApiTags('auth')

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDto })
  @Post('/login')
  @ResponseMessage("User login")
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }
  @Public()
  @ResponseMessage("Register a new user")
  @ApiBody({ type: RegisterUserDto })
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @ResponseMessage("Get user information")
  @Get('/account')
  async handleGetAccount(@User() user: IUser) {
    console.log(user)
    return { user }
  }
  @Public()
  @ResponseMessage("Get User by refresh token")
  @Get('/refresh')
  handleRefresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies["refresh_token"];
    return this.authService.processNewToken(refreshToken, response);
  }

  @ResponseMessage("Logout User")
  @Post('/logout')
  handleLogout(@Res({ passthrough: true }) response: Response, @User() user: IUser) {
    return this.authService.logout(response, user);
  }
  @ResponseMessage("Change Password")
  @ApiBody({type: ChangePasswordDto})
  @Patch('change-password') 
  async changePassword(@User() user: IUser, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(user, changePasswordDto);
  }
}
