import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as jose from "jose";
const HEADER_ID_TOKEN = "X-Id-Token";

export interface User {
  given_name: string;
  picture: string;
  email: string;
}

/**
 * @usage get(@MeId(): me: JwtPayload) {}
 */
export const Me = createParamDecorator(
  (data: string, ctx: ExecutionContext): User | undefined => {
    const request: Request = ctx.switchToHttp().getRequest();
    const jwt = request.headers[HEADER_ID_TOKEN.toLowerCase()];
    if (jwt) {
      return jose.decodeJwt(jwt) as unknown as User;
    }
    return undefined;
  }
);
