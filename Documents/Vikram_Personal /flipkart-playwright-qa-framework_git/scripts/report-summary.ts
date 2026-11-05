import {pool} from "../src/database/pool.js";
const [rows]=await pool.query("SELECT status,COUNT(*) AS total FROM automation_runs WHERE started_at>=NOW()-INTERVAL 7 DAY GROUP BY status");
console.table(rows);await pool.end();