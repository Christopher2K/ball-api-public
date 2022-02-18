import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

import User from "App/Models/User";
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  BelongsTo,
  column,
} from "@ioc:Adonis/Lucid/Orm";

export default class Profile extends BaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public username: string;

  @column()
  public firstName: string | null;

  @column()
  public lastName: string | null;

  @column.date()
  public dateOfBirth: DateTime | null;

  @column()
  public avatarUrl: string | null;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(profile: Profile) {
    profile.id = uuidv4();
  }
}
