declare module "@ioc:Adonis/Core/HttpContext" {
  import User from "App/Models/User";

  interface HttpContextContract {
    user?: User;
  }
}
