import uuid from "uuid";
import { DateTime } from "luxon";
import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

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
    user.id = uuid.v4();
  }
}
