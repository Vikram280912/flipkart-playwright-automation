import {expect,type Page} from "@playwright/test";
import {env} from "../config/env.js";
export class HomePage {
 constructor(private page:Page){}
 async open(){await this.page.goto(env.baseUrl,{waitUntil:"domcontentloaded",timeout:env.navigationTimeout});}
 async dismissPopup(){
  for(const text of [/not now/i,/✕/]){
   const loc=this.page.getByText(text).first();
   if(await loc.isVisible().catch(()=>false))await loc.click().catch(()=>undefined);
  }
 }
 async search(keyword:string){
  const input=this.page.locator('input[name="q"],input[placeholder*="Search"],input[title*="Search"]').first();
  await expect(input).toBeVisible();await input.fill(keyword);await input.press("Enter");
  await this.page.waitForLoadState("domcontentloaded").catch(()=>undefined);
 }
 async expectResults(keyword:string){
  await expect(this.page).toHaveURL(/search/i,{timeout:20000});
  await expect(this.page.locator("body")).toContainText(new RegExp(keyword.split(" ")[0],"i"));
 }
 async openFirstProduct(){
  const link=this.page.locator('a[href*="/p/"],a[href*="pid="]').first();
  await expect(link).toBeVisible({timeout:20000});await link.click();
 }
}