import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import FirebaseAuth from "@ioc:Firebase/Auth";

import SignUpValidator from "App/Validators/SignUpValidator";
import User from "App/Models/User";

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const payload = await request.validate(SignUpValidator);

    // Create Firebase User
    const firebaseUserRecord = await FirebaseAuth.createUser({
      email: payload.email,
      password: payload.password,
      displayName: payload.username,
    });

    // Create profile in app DB
    const user = await User.create({
      firebaseId: firebaseUserRecord.uid,
      email: payload.email,
      username: payload.username,
      password: payload.password,
    });

    response.ok(user.serialize());
  }

  public async login() {}

  public async logout() {}
}
