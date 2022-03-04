// Modules has been installed before runing this script
import execa from "execa";

async function main() {
  // 1. Run migrations
  await execa.node("ace", ["migration:run"], {
    stdio: "inherit",
  });

  // 2. Build app
  await execa.node("yarn build", {
    stdio: "inherit",
  });
}

main();
