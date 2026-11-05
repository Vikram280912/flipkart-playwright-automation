import {World,setWorldConstructor,type IWorldOptions} from "@cucumber/cucumber";
import {chromium,firefox,webkit,type Browser,type BrowserContext,type Page} from "@playwright/test";
import {env} from "../../src/config/env.js";
import {QaDatabase} from "../../src/database/db.js";
import {EvidenceRepository} from "../../src/database/evidenceRepository.js";
import {AuthorizedApiClient} from "../../src/api/authorizedApiClient.js";
import {NetworkObserver} from "../../src/network/networkObserver.js";
import {MockRoutes} from "../../src/network/mockRoutes.js";
import {HomePage} from "../../src/pages/HomePage.js";
import {SearchResultsPage} from "../../src/pages/SearchResultsPage.js";
import {ProductDetailsPage} from "../../src/pages/ProductDetailsPage.js";
import {newRunId} from "../../src/utils/id.js";
export class CustomWorld extends World {
 browser?:Browser;context?:BrowserContext;page?:Page;
 db!:QaDatabase;evidence!:EvidenceRepository;api!:AuthorizedApiClient;observer!:NetworkObserver;mocks!:MockRoutes;
 home!:HomePage;results!:SearchResultsPage;product!:ProductDetailsPage;
 runUuid=newRunId();keyword="";observed?:{title:string;price?:string;url?:string};apiStatus?:number;apiHost?:string;started=Date.now();
 constructor(options:IWorldOptions){super(options);}
 async start(){
  const type=env.browser==="firefox"?firefox:env.browser==="webkit"?webkit:chromium;
  this.browser=await type.launch({headless:env.headless,slowMo:env.slowMo});
  this.context=await this.browser.newContext({viewport:{width:1440,height:1000},
   ...(process.env.USE_STORAGE_STATE==="true"?{storageState:env.storageState}:{})});
  await this.context.tracing.start({screenshots:true,snapshots:true,sources:true});
  this.page=await this.context.newPage();this.page.setDefaultTimeout(env.defaultTimeout);this.page.setDefaultNavigationTimeout(env.navigationTimeout);
  this.db=new QaDatabase();this.evidence=new EvidenceRepository(this.db);this.api=new AuthorizedApiClient();await this.api.init();
  this.observer=new NetworkObserver();this.observer.attach(this.page);this.mocks=new MockRoutes(this.page);
  this.home=new HomePage(this.page);this.results=new SearchResultsPage(this.page);this.product=new ProductDetailsPage(this.page);
 }
 async stop(){
  await this.mocks?.clear().catch(()=>undefined);await this.api?.close().catch(()=>undefined);
  await this.db?.close().catch(()=>undefined);await this.context?.close().catch(()=>undefined);await this.browser?.close().catch(()=>undefined);
 }
}
setWorldConstructor(CustomWorld);