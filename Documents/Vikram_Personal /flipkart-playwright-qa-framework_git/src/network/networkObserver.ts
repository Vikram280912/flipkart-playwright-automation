import type {Page,Request,Response} from "@playwright/test";
export class NetworkObserver {
 requests:Array<{method:string;url:string;resourceType:string}>=[];
 responses:Array<{url:string;status:number}>=[];
 attach(page:Page){
  page.on("request",(r:Request)=>this.requests.push({method:r.method(),url:r.url(),resourceType:r.resourceType()}));
  page.on("response",(r:Response)=>this.responses.push({url:r.url(),status:r.status()}));
 }
}