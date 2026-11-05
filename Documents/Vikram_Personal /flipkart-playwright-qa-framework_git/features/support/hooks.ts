import {Before,After,Status,setDefaultTimeout} from "@cucumber/cucumber";
import {mkdir} from "node:fs/promises";
import type {CustomWorld} from "./world.js";
import {env} from "../../src/config/env.js";
setDefaultTimeout(90000);
Before(async function(this:CustomWorld){this.started=Date.now();await this.start();});
After(async function(this:CustomWorld,{pickle,result}){
 const status=result?.status===Status.PASSED?"PASSED":result?.status===Status.FAILED?"FAILED":result?.status===Status.SKIPPED?"SKIPPED":"UNKNOWN";
 if(status==="FAILED"&&this.page){const shot=await this.page.screenshot({fullPage:true}).catch(()=>undefined);if(shot)await this.attach(shot,"image/png");}
 if(this.context){
  if(status==="FAILED"){await mkdir("test-results",{recursive:true});await this.context.tracing.stop({path:`test-results/trace-${this.runUuid}.zip`}).catch(()=>undefined);}
  else await this.context.tracing.stop().catch(()=>undefined);
 }
 if(this.evidence)await this.evidence.saveRun({runUuid:this.runUuid,feature:pickle.uri,scenario:pickle.name,tags:pickle.tags.map(t=>t.name),browser:env.browser,status,durationMs:Date.now()-this.started,error:result?.message?.slice(0,4000)}).catch(e=>console.error("QA evidence write failed",e));
 await this.stop();
});