import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post('register')
  signUp(@Body() body): Promise<{ token: string }> {
    return this.authServise.signUp(body);
  }

  @Post('login')
  signIn(@Body() body): Promise<{ token: string }> {
    return this.authServise.login(body);
  }
}
