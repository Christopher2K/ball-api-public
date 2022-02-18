import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import SupabaseAuth from "@ioc:Supabase/Auth";
import Env from "@ioc:Adonis/Core/Env";

import SignUpValidator from "App/Validators/SignUpValidator";
import User from "App/Models/User";
import UserAlreadyExistException from "App/Exceptions/UserAlreadyExistException";
import RuntimeErrorException from "App/Exceptions/RuntimeErrorException";

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const payload = await request.validate(SignUpValidator);

    // Create Supabase User
    const { user: supabaseUser, error } = await SupabaseAuth.api.createUser({
      email: payload.email,
      password: payload.password,
      email_confirm: !Env.get("NEED_EMAIL_CONFIRM"),
    });

    if (supabaseUser) {
      const userId = supabaseUser.id;
      const user = await User.findOrFail(userId);
      const profile = await user.related("profile").create({
        username: payload.username,
      });

      if (!profile)
        throw new RuntimeErrorException(
          "Profile was not created during signup"
        );

      profile.load("user");

      return response.ok(profile.serialize());
    } else if (error) {
      if (error.status === 422) {
        throw new UserAlreadyExistException();
      }
    } else {
      throw new RuntimeErrorException("Signup process failed");
    }
  }
}
