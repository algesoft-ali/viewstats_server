import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { IUser, IUserResponse } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject("USER_MODEL") private readonly userModel: Model<IUser>,
    private jwtService: JwtService
  ) {}
  async googleLogin(req): Promise<IUserResponse> {
    let user = null;
    if (!req.user) {
      return null;
    }

    user = await this.userModel.findOne({ email: req.user.email });

    if (!user) {
      // ------ create new user
      const data = {
        name: req?.user?.name,
        email: req?.user?.email,
        googleId: req?.user?.googleId,
      };
      user = await this.userModel.create(data);
    }

    // ------ generate access token
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: "1d",
      }
    );

    return {
      accessToken,
      user,
    };
  }
}
