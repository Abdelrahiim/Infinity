import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInUserDto } from './Dto';
import { STATUS_CODES } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() signInUserDto: SignInUserDto) {
    return this.authService.login(signInUserDto);
  }

  @Post('logout')
  logout() {}

  @Get('/verify-email')
  verifyEmail() {}

  @Post('/forgot-password')
  forgotPassword() {
    // will send email to user with code and expiry
  }

  @Get('/reset-password')
  resetPassword() {
    // will check the code and expiry and redirect to new password page
  }

  @Post('/change-password')
  changePassword() {}

  @Put('/user')
  updateUser() {}
}
