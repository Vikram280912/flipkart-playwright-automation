import mysql from "mysql2/promise";
import { env } from "../src/config/env.js";

const maxAttempts = 40;
for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  try {
    const connection = await mysql.createConnection({
      host: env.mysql.host,
      port: env.mysql.port,
      user: env.mysql.user,
      password: env.mysql.password,
      database: env.mysql.database,
      connectTimeout: 3000
    });
    await connection.ping();
    await connection.end();
    console.log("QA MySQL is ready.");
    process.exit(0);
  } catch (error) {
    if (attempt === maxAttempts) {
      console.error("MySQL did not become ready:", error);
      process.exit(1);
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}
