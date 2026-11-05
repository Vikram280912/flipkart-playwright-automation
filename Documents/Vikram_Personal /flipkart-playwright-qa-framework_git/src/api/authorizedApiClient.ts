import {request,type APIRequestContext} from "@playwright/test";
import {env} from "../config/env.js";
export class AuthorizedApiClient {
 private context?:APIRequestContext;
 async init(){
  if(!env.authorizedApiBaseUrl)return;
  const u=new URL(env.authorizedApiBaseUrl);
  if(!env.authorizedApiAllowedHosts.includes(u.hostname.toLowerCase()))throw new Error(`API host ${u.hostname} is not allowlisted`);
  this.context=await request.newContext({baseURL:u.toString()});
 }
 async get(path:string){
  if(!this.context)throw new Error("API client disabled: configure documented, authorized API URL and host allowlist.");
  const target=new URL(path,env.authorizedApiBaseUrl);
  if(!env.authorizedApiAllowedHosts.includes(target.hostname.toLowerCase()))throw new Error(`Blocked non-allowlisted API host: ${target.hostname}`);
  return this.context.get(target.toString());
 }
 async close(){await this.context?.dispose();}
}