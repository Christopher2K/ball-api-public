import { BaseCommand } from "@adonisjs/core/build/standalone";

import { removeAllStorageBuckets } from "utils/commands";

export default class SupabaseClear extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = "supabase:clear";

  /**
   * Command description is displayed in the "help" output
   */
  public static description =
    "Entirely clear supabase - DO NOT RUN THIS COMMAND IN THE PRODUCTION ENVIRONEMENT";

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  };

  public async run() {
    await removeAllStorageBuckets(this.logger);
  }
}
