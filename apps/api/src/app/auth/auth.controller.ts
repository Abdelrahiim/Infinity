import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './Dto/sign-in-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register() {}

  @Post('login')
  login(@Body() signInUserDTO: SignInUserDto) {
    return this.authService.register(signInUserDTO);
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
