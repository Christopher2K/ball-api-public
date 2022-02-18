// contracts/Mongoose.ts

declare module "@ioc:Firebase/Auth" {
  import type { Auth } from "firebase-admin/auth";
  const auth: Auth;
  export default auth;
}
