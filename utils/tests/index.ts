import execa from "execa";

export const getBaseUrl = () =>
  `http://${process.env.HOST}:${process.env.PORT}`;

export async function supabaseLocalStart() {
  await execa.command("supabase start", {
    stdio: "inherit",
  });
}

export async function supabaseLocalStop() {
  await execa.command("supabase stop", {
    stdio: "inherit",
  });
}

export async function resetSupabaseDb() {
  await execa.command("supabase db reset", {
    stdio: "inherit",
  });
}

export async function runMigrations() {
  await execa.node("ace", ["migration:run"], {
    stdio: "inherit",
  });
}

export async function rollbackMigrations() {
  await execa.node("ace", ["migration:rollback", "--batch=0"], {
    stdio: "inherit",
  });
}

export async function cleanDb() {
  await resetSupabaseDb();
  await runMigrations();
}
