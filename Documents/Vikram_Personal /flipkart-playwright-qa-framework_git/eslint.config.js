import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";
export default [{ignores:["node_modules/**","dist/**","reports/**","playwright/.auth/**"]},
 {files:["**/*.ts"],languageOptions:{parser,parserOptions:{ecmaVersion:"latest",sourceType:"module"}},
 plugins:{"@typescript-eslint":plugin},rules:{"@typescript-eslint/no-explicit-any":"warn","no-console":"off"}}];