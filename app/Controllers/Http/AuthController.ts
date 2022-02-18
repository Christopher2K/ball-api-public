import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import FirebaseAuth from "@ioc:Firebase/Auth";

import SignUpValidator from "App/Validators/SignUpValidator";

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const payload = await request.validate(SignUpValidator);

    const firebaseUserRecord = await FirebaseAuth.createUser({
      email: payload.email,
      password: payload.password,
      displayName: payload.username,
    });

    // TODO: Create user profile here

    response.ok({
      id: firebaseUserRecord.uid,
      name: firebaseUserRecord.displayName,
    });
  }

  public async login() {}

  public async logout() {}
}
