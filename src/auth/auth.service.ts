import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(body): Promise<{ token: string }> {
    const { name, email, password } = body;
    const hashpass = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashpass,
    });

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(body): Promise<{ token: string }> {
    const { email, password } = body;

    const user = await this.userModel.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
