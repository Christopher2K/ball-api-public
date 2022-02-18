import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

import Hash from "@ioc:Adonis/Core/Hash";
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  column,
} from "@ioc:Adonis/Lucid/Orm";

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public firebaseId: string;

  @column()
  public username: string;

  @column()
  public email: string;

  @column({
    serializeAs: null,
  })
  public password: string;

  @column()
  public firstName: string | null;

  @column()
  public lastName: string | null;

  @column.date()
  public dateOfBirth: DateTime | null;

  @column()
  public avatarUrl: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4();
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password && !user.password.startsWith("$argon")) {
      user.password = await Hash.make(user.password);
    }
  }
}
