import { passportJwtSecret } from "jwks-rsa";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

/**
 * It's redacted of course :)
 * {
 *   "given_name": "Protocole",
 *   "nickname": "the.asto63",
 *   "name": "",
 *   "picture": "https://lh3.googleusercontent.com/a/-SmwQ=s96-c",
 *   "locale": "fr",
 *   "updated_at": "2022-12-01T07:46:51.609Z",
 *   "email": "the.asto63@gmail.com",
 *   "email_verified": true,
 *   "iss": "https://dev-.eu.auth0.com/",
 *   "sub": "google-oauth2|",
 *   "aud": "",
 *   "iat": 1669930047,
 *   "exp": 1669966047,
 *   "sid": "",
 *   "nonce": ".8i3Gu8BM.YJxKcRTBuMsY"
 * }
 */

interface JwtPayload {
  given_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  sid: string;
  nonce: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get("auth0.issuer")}/.well-known/jwks.json`
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get("auth0.audience"),
      issuer: configService.get("auth0.issuer") + "/",
      algorithms: ["RS256"]
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
