// Modules has been installed before runing this script
import execa from "execa";
import { exit } from "process";

async function main() {
  try {
    // 1. Run migrations
    await execa.node("ace", ["migration:run"], {
      stdio: "inherit",
    });

    // 2. Build app
    await execa.command("yarn build", {
      stdio: "inherit",
    });
  } catch (e) {
    console.error(e);
    exit(1);
  }
}

main();
