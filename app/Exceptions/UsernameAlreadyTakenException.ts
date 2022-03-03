import { Exception } from "@adonisjs/core/build/standalone";

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UserAlreadyExistException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UsernameAlreadyTaken extends Exception {
  constructor(
    message: string = "This username is already taken",
    status: number = 422,
    code: string = "E_USERNAME_ALREADY_TAKEN"
  ) {
    super(message, status, code);
  }
}
