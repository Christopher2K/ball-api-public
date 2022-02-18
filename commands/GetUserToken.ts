import { BaseCommand, args } from "@adonisjs/core/build/standalone";

import SupabaseAuth from "@ioc:Supabase/Auth";

export default class GetUserToken extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = "get:user_token";

  /**
   * Command description is displayed in the "help" output
   */
  public static description = "Get user's JWT token from Supabase";

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  };

  @args.string({ description: "User email" })
  public email: string;

  @args.string({ description: "User password" })
  public password: string;

  public async run() {
    this.logger.info("Sign in the user from Supabase");
    const supabaseUser = await SupabaseAuth.api.signInWithEmail(
      this.email,
      this.password
    );

    this.logger.info("Getting the access token...");
    const token = supabaseUser.data?.access_token;

    if (token) {
      this.logger.success(token);
    } else {
      this.logger.error(`Error: ${supabaseUser.error?.message}`);
    }
  }
}
