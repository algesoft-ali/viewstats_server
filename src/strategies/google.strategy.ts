import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

import { Injectable } from "@nestjs/common";
import config from "config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: config.google.client_id,
      clientSecret: config.google.client_secret,
      callbackURL: `${config.server_url}/auth/google/callback`,
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { _json } = profile;
    const user = {
      email: _json?.email,
      name: _json?.name,
      googleId: _json?.sub,
    };
    done(null, user);
  }
}
