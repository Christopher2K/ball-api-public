import { BaseCommand } from "@adonisjs/core/build/standalone";

import { createStorageBuckets } from "utils/commands";

export default class SupabaseInit extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = "supabase:init";

  /**
   * Command description is displayed in the "help" output
   */
  public static description =
    "Spin up a new supabase environement - DO NOT RUN THIS COMMAND IN THE PRODUCTION ENVIRONEMENT";

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
    await createStorageBuckets(this.logger);
  }
}
