import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import SupabaseAuth from "@ioc:Supabase/Auth";
import Env from "@ioc:Adonis/Core/Env";

import SignUpValidator from "App/Validators/SignUpValidator";
import User from "App/Models/User";
import Profile from "App/Models/Profile";
import UserAlreadyExistException from "App/Exceptions/UserAlreadyExistException";
import UsernameAlreadyTakenException from "App/Exceptions/UsernameAlreadyTakenException";
import RuntimeErrorException from "App/Exceptions/RuntimeErrorException";

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const payload = await request.validate(SignUpValidator);

    // Tests
    const existingProfile = await Profile.findBy("username", payload.username);
    if (existingProfile) throw new UsernameAlreadyTakenException();

    // Create Supabase User
    const {
      user: supabaseUser,
      error,
      data: supabaseData,
    } = await SupabaseAuth.api.createUser({
      email: payload.email,
      password: payload.password,
      email_confirm: !Env.get("NEED_EMAIL_CONFIRM"),
    });

    const newUser = supabaseUser ?? supabaseData;

    if (newUser) {
      const userId = newUser.id;
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
    } else if (error?.status === 422) {
      throw new UserAlreadyExistException();
    } else {
      throw new RuntimeErrorException("Signup process failed");
    }
  }
}
