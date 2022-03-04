export interface Logger {
  info: (message: string) => unknown;
  success: (message: string) => unknown;
  error: (message: string) => unknown;
}
