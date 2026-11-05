export default {
 default:{
  paths:["features/**/*.feature"],
  import:["tsx","features/support/**/*.ts","features/step-definitions/**/*.ts"],
  format:["progress","json:reports/cucumber-report.json","junit:reports/junit.xml","allure-cucumberjs/reporter"],
  formatOptions:{resultsDir:"reports/allure-results"},publishQuiet:true,parallel:1,retry:0,failFast:false
 }
};