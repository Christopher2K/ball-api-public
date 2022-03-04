declare module "@ioc:Supabase/Auth" {
  import type { SupabaseAuthClient } from "@supabase/supabase-js/dist/main/lib/SupabaseAuthClient";

  const auth: SupabaseAuthClient;
  export default auth;
}
declare module "@ioc:Supabase/Storage" {
  import type { SupabaseStorageClient } from "@supabase/storage-js/src/SupabaseStorageClient";

  const storage: SupabaseStorageClient;
  export default storage;
}
