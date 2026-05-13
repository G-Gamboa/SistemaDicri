import app from "./app.js";
import { closePool } from "./db/connection.js";

const requiredEnv = ["DB_USER", "DB_PASSWORD", "DB_SERVER", "DB_NAME", "JWT_SECRET"];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    process.stderr.write(`[FATAL] Missing required environment variable: ${key}\n`);
    process.exit(1);
  }
}

const port = process.env.PORT || 3000;

const server = app.listen(port);

const shutdown = async () => {
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
