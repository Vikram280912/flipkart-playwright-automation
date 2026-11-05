import fs from "node:fs/promises";
import {pool} from "../src/database/pool.js";
const schema=await fs.readFile("database/schema.sql","utf8");
for(const sql of schema.split(";").map(s=>s.trim()).filter(Boolean))await pool.query(sql);
console.log("QA evidence schema migrated");await pool.end();