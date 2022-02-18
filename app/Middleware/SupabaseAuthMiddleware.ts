import JWT from "jsonwebtoken";

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";
import { validator } from "@ioc:Adonis/Core/Validator";

import SupabaseJwtPayloadValidator from "App/Validators/SupabaseJwtPayloadValidator";
import User from "App/Models/User";

/**
 * This middleware is responsaible for verifying Supabase JWT Tokens.
 * If the token is valid, the middleware will add the current user to the request context and continue to the next middleware
 * If the token is not valid, we will return an error and thrown a 401
 */
export default class SupabaseAuthMiddleware {
  public async handle(context: HttpContextContract, next: () => Promise<void>) {
    const { request, response } = context;

    // Get authorization header
    const authorizationHeader = request.header("Authorization");
    const [tokenName, tokenValue] = (authorizationHeader ?? "").split(" ");
    const headerFormatIsValid =
      tokenName === "Bearer" && tokenValue != undefined;

    // Format check
    if (!headerFormatIsValid) return response.unauthorized();

    // JWT secret check
    const jwtSecret = Env.get("SUPABASE_JWT_SECRET");
    let jwtPayload: JWT.JwtPayload | string;

    try {
      jwtPayload = JWT.verify(tokenValue, jwtSecret, {});
    } catch (e) {
      return response.unauthorized({});
    }

    const payload = await validator.validate(
      new SupabaseJwtPayloadValidator(jwtPayload)
    );
    const user = await User.findOrFail(payload.sub);
    context.user = user;

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next();
  }
}
