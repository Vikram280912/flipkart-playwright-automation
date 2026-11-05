import {expect,type Page} from "@playwright/test";
export class ProductDetailsPage {
 constructor(private page:Page){}
 async verify(){
  await expect(this.page).toHaveURL(/\/p\/|pid=/i,{timeout:20000});
  await expect(this.page.locator("h1,h2").first()).toBeVisible();
  await expect(this.page.locator("body")).toContainText(/₹|currently unavailable|out of stock|sold out/i);
 }
}