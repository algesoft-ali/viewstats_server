import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard as AuthGuardPassport } from "@nestjs/passport";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // ------ Google Login
  @Get("google")
  @UseGuards(AuthGuardPassport("google"))
  async googleAuth(@Req() req) {}

  @Get("google/callback")
  @UseGuards(AuthGuardPassport("google"))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      const { accessToken } = await this.authService.googleLogin(req);

      const redirectUrl = `${process.env.CLIENT_URL}/google?accessToken=${accessToken}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.log(error);
      res.redirect(process.env.CLIENT_URL);
    }
  }
}
