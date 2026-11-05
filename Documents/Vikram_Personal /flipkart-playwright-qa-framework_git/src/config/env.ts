import "dotenv/config";
const hosts=(process.env.AUTHORIZED_API_ALLOWED_HOSTS??"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);
export const env={
 baseUrl:process.env.BASE_URL??"https://www.flipkart.com",
 browser:process.env.BROWSER??"chromium",
 headless:(process.env.HEADLESS??"true").toLowerCase()!=="false",
 slowMo:Number(process.env.SLOW_MO??0),
 defaultTimeout:Number(process.env.DEFAULT_TIMEOUT??15000),
 navigationTimeout:Number(process.env.NAVIGATION_TIMEOUT??45000),
 storageState:process.env.STORAGE_STATE??"playwright/.auth/flipkart-user.json",
 mysql:{host:process.env.MYSQL_HOST??"127.0.0.1",port:Number(process.env.MYSQL_PORT??3307),
 user:process.env.MYSQL_USER??"qa_user",password:process.env.MYSQL_PASSWORD??"qa_password",
 database:process.env.MYSQL_DATABASE??"flipkart_qa",connectionLimit:Number(process.env.MYSQL_CONNECTION_LIMIT??5)},
 authorizedApiBaseUrl:process.env.AUTHORIZED_API_BASE_URL??"",
 authorizedApiAllowedHosts:hosts
};