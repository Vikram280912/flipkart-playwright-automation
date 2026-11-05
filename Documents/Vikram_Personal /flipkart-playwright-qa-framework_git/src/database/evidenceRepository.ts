import type {QaDatabase} from "./db.js";
export class EvidenceRepository {
 constructor(private db:QaDatabase){}
 async saveRun(d:{runUuid:string;feature:string;scenario:string;tags:string[];browser:string;status:string;durationMs:number;error?:string}){
  await this.db.execute(`INSERT INTO automation_runs(run_uuid,feature_name,scenario_name,tags_json,browser_name,status,duration_ms,error_summary,finished_at) VALUES(?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`,
  [d.runUuid,d.feature,d.scenario,JSON.stringify(d.tags),d.browser,d.status,d.durationMs,d.error??null]);
 }
 async saveApiEvidence(d:{runUuid:string;host:string;label:string;method:string;status?:number;durationMs?:number;outcome:"PASS"|"FAIL"|"BLOCKED"}){
  await this.db.execute("INSERT INTO api_evidence(run_uuid,target_host,endpoint_label,http_method,status_code,duration_ms,outcome) VALUES(?,?,?,?,?,?,?)",
  [d.runUuid,d.host,d.label,d.method,d.status??null,d.durationMs??null,d.outcome]);
 }
 async saveProduct(d:{runUuid:string;keyword:string;title:string;price?:string;url?:string}){
  await this.db.execute("INSERT INTO observed_products(run_uuid,search_keyword,product_title,price_text,product_url) VALUES(?,?,?,?,?)",
  [d.runUuid,d.keyword,d.title,d.price??null,d.url??null]);
 }
}