import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";

import Profile from "App/Models/Profile";

export default class User extends BaseModel {
  public static table = "auth.users";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Relationships
  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>;
}
