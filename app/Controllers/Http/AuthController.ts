import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import SupabaseAuth from "@ioc:Supabase/Auth";

import SignUpValidator from "App/Validators/SignUpValidator";
// import User from "App/Models/User";

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const payload = await request.validate(SignUpValidator);

    // Create Supabase User
    const supabaseUser = await SupabaseAuth.signUp({
      email: payload.email,
      password: payload.password,
    });

    response.ok({});
  }

  public async login() {}

  public async logout() {}
}
