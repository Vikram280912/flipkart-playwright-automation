import {Given,When,Then} from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import type {CustomWorld} from "../support/world.js";
Given("I open the Flipkart homepage",async function(this:CustomWorld){
 await this.home.open();await this.home.dismissPopup();await expect(this.page!).toHaveURL(/flipkart\.com/i);
});
When("I search Flipkart for {string}",async function(this:CustomWorld,keyword:string){
 this.keyword=keyword;await this.home.search(keyword);
});
Then("search results should be displayed",async function(this:CustomWorld){
 await this.home.expectResults(this.keyword);expect(await this.results.count()).toBeGreaterThan(0);
});
Then("the first product should have a visible title",async function(this:CustomWorld){
 this.observed=await this.results.firstProduct();expect(this.observed.title.length).toBeGreaterThan(2);
 await this.evidence.saveProduct({runUuid:this.runUuid,keyword:this.keyword,...this.observed});
});
When("I open the first product",async function(this:CustomWorld){await this.home.openFirstProduct();});
Then("the product details page should be displayed",async function(this:CustomWorld){await this.product.verify();});
Then("Flipkart network activity should have been observed",async function(this:CustomWorld){expect(this.observer.requests.length).toBeGreaterThan(0);});
Then("the QA MySQL database should be reachable",async function(this:CustomWorld){
 const rows=await this.db.query<any[]>("SELECT 1 AS ready");expect(rows[0].ready).toBe(1);
});
Then("the observed product should be recorded in QA MySQL",async function(this:CustomWorld){
 expect(this.observed).toBeTruthy();
 const rows=await this.db.query<any[]>("SELECT product_title FROM observed_products WHERE run_uuid=?",[this.runUuid]);
 expect(rows.length).toBeGreaterThan(0);expect(rows[0].product_title).toBe(this.observed!.title);
});
When("I stub the QA mock search service with status {int}",async function(this:CustomWorld,status:number){await this.mocks.stubQaSearch(status);});
Then("the QA mock search service should return status {int}",async function(this:CustomWorld,status:number){
 const response=await this.mocks.requestQaSearch();expect(response.status()).toBe(status);
});

When("I call the authorized GET endpoint {string}",async function(this:CustomWorld,path:string){
 const base=process.env.AUTHORIZED_API_BASE_URL;
 if(!base)throw new Error("Set AUTHORIZED_API_BASE_URL and AUTHORIZED_API_ALLOWED_HOSTS for an approved API.");
 const target=new URL(path,base);
 this.apiHost=target.hostname;
 const started=Date.now();
 try {
  const response=await this.api.get(path);
  this.apiStatus=response.status();
  await this.evidence.saveApiEvidence({
   runUuid:this.runUuid,host:this.apiHost,label:path,method:"GET",
   status:this.apiStatus,durationMs:Date.now()-started,outcome:this.apiStatus>=200&&this.apiStatus<400?"PASS":"FAIL"
  });
 } catch(error) {
  await this.evidence.saveApiEvidence({
   runUuid:this.runUuid,host:this.apiHost,label:path,method:"GET",
   durationMs:Date.now()-started,outcome:"FAIL"
  });
  throw error;
 }
});
Then("the authorized API status should be {int}",async function(this:CustomWorld,status:number){
 expect(this.apiStatus).toBe(status);
});
