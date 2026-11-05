import type {Page} from "@playwright/test";
/** Safe demonstration stub for a QA-owned synthetic route, not Flipkart production. */
export class MockRoutes {
 constructor(private page:Page){}
 async stubQaSearch(status=503){
  await this.page.route("https://qa-mock.local/search**",r=>r.fulfill({status,contentType:"application/json",body:JSON.stringify({error:"QA mock service unavailable"})}));
 }
 async requestQaSearch(){return this.page.evaluate(async()=>{const r=await fetch("https://qa-mock.local/search?q=laptop");return r.status;});}
 async clear(){await this.page.unrouteAll({behavior:"wait"});}
}