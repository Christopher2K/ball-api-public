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
| new RuntimeErrorException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class RuntimeErrorException extends Exception {
  constructor(
    message: string = "Something bad happened",
    status: number = 500,
    code: string = " E_RUNTIME_ERROR"
  ) {
    super(message, status, code);
  }
}
