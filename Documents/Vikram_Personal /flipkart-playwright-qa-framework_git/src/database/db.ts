import mysql,{type Pool,type RowDataPacket,type ResultSetHeader} from "mysql2/promise";
import {env} from "../config/env.js";
export class QaDatabase {
 private pool:Pool;
 constructor(){this.pool=mysql.createPool({...env.mysql,waitForConnections:true,connectionLimit:env.mysql.connectionLimit,decimalNumbers:true});}
 async query<T extends RowDataPacket[]>(sql:string,params:unknown[]=[]):Promise<T>{const [rows]=await this.pool.execute<T>(sql,params);return rows;}
 async execute(sql:string,params:unknown[]=[]):Promise<ResultSetHeader>{const [r]=await this.pool.execute<ResultSetHeader>(sql,params);return r;}
 async close():Promise<void>{await this.pool.end();}
}