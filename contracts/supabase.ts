// contracts/Mongoose.ts

declare module "@ioc:Supabase/Auth" {
  import type { SupabaseAuthClient } from "@supabase/supabase-js/dist/main/lib/SupabaseAuthClient";

  const auth: SupabaseAuthClient;
  export default auth;
}
