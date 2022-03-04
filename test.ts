import "reflect-metadata";
import { configure } from "japa";
import { join } from "path";
import getPort from "get-port";
import sourceMapSupport from "source-map-support";
import type { HttpServer } from "@adonisjs/core/build/src/Ignitor/HttpServer";

import {
  supabaseLocalStart,
  supabaseLocalStop,
  runMigrations,
  resetSupabaseDb,
} from "utils/tests";

process.env.NODE_ENV = "testing";
process.env.ADONIS_ACE_CWD = join(__dirname);
sourceMapSupport.install({ handleUncaughtExceptions: false });

let httpServer: HttpServer | null = null;

async function startHttpServer() {
  const { Ignitor } = await import("@adonisjs/core/build/src/Ignitor");
  process.env.PORT = String(await getPort());
  httpServer = new Ignitor(__dirname).httpServer();
  await httpServer.start();
}

async function stopHttpServer() {
  if (httpServer !== null) {
    await httpServer.close();
  }
}

configure({
  files: ["tests/e2e/**/*.spec.ts"],
  before: [supabaseLocalStart, runMigrations, startHttpServer],
  after: [stopHttpServer, resetSupabaseDb, supabaseLocalStop],
});
