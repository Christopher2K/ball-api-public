import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import SupabaseAuth from "@ioc:Supabase/Auth";

import SignUpValidator from "App/Validators/SignUpValidator";
import User from "App/Models/User";

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const payload = await request.validate(SignUpValidator);

    // Create Supabase User
    const supabaseUser = await SupabaseAuth.api.createUser({
      email: payload.email,
      password: payload.password,
    });

    if (supabaseUser.user) {
      const userId = supabaseUser.user.id;
      const user = await User.findOrFail(userId);
      const profile = await user.related("profile").create({
        username: payload.username,
      });

      if (!profile) throw Error("Profile was not created");

      profile.load("user");

      response.ok(profile.serialize());
    } else {
      // If this happens, the user should not exist in Supabase
      // If it is, lol
      response.badRequest();
    }
  }

  public async login() {}

  public async logout() {}
}
