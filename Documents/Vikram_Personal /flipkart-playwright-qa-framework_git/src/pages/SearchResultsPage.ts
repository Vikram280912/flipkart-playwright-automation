import {expect,type Page} from "@playwright/test";
export class SearchResultsPage {
 constructor(private page:Page){}
 async count(){return this.page.locator('a[href*="/p/"],a[href*="pid="]').count();}
 async firstProduct(){
  const link=this.page.locator('a[href*="/p/"],a[href*="pid="]').filter({hasText:/[A-Za-z]/}).first();
  await expect(link).toBeVisible();
  const title=(await link.innerText()).trim().replace(/\s+/g," ").slice(0,500);
  const href=await link.getAttribute("href");
  const price=title.match(/₹\s?[\d,]+(?:\.\d{1,2})?/i)?.[0];
  return {title,price,url:href?new URL(href,"https://www.flipkart.com").toString():undefined};
 }
}