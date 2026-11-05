# Flipkart Playwright + TypeScript + Cucumber QA Framework

Enterprise-oriented browser automation starter for the public Flipkart website.

## Included
- Playwright + TypeScript + Cucumber BDD
- Guest homepage, search, product listing and product details checks
- Manual login/session capture (no OTP/CAPTCHA automation)
- Browser network observation and QA-owned mock route example
- Authorized API client with explicit hostname allowlist
- QA-owned MySQL evidence database (not Flipkart's internal DB)
- Cucumber JSON/JUnit + Allure reports
- Jenkins pipeline and Docker Compose

## Important boundaries
This project automates the publicly accessible website through normal browser navigation. Flipkart private APIs and databases are not assumed to be accessible. Do not reverse engineer private endpoints or bypass bot protection, CAPTCHA, OTP, rate limits or access restrictions. Keep execution low-volume and comply with applicable terms and written authorization.

MySQL stores QA execution metadata and observed public product evidence. It does not validate Flipkart's internal order, payment or inventory records.

The API client is disabled until an authorized base URL and exact host allowlist are configured. Network stubbing is demonstrated on a synthetic QA-owned hostname, not on Flipkart production endpoints.

## Prerequisites
Node.js 20+, npm, Docker Compose; Java 11+ for Allure CLI.

## Setup
```bash
cp .env.example .env
npm install
npx playwright install chromium
docker compose up -d mysql
npm run db:migrate
npm run test:smoke
```

## Manual login
```bash
npm run manual:login
```
A headed browser opens Flipkart. Sign in yourself if needed, complete any OTP/CAPTCHA manually, then return to the terminal and press Enter. Session state is saved under `playwright/.auth/` and git-ignored. Treat it as a password-equivalent secret. Do not upload it to Git or public CI artifacts.

To use saved state locally, set `USE_STORAGE_STATE=true`. Shared CI use requires an approved test account and secure secret handling.

## Commands
```bash
npm run test:smoke
npm run test:search
npm run test:product
npm run test:network
npm run test:api
npm run test:db
npm run test:regression
npm run test:parallel
npm run typecheck
npm run lint
npm run allure:generate
npm run allure:open
npm run db:report
```

## Database
Host port 3307 maps to MySQL container port 3306. Tables: `automation_runs`, `observed_products`, `api_evidence`. Change local credentials for shared environments. Use only QA-owned DB credentials and never store customer/payment secrets.

## Authorized API setup
Obtain written permission and official endpoint documentation. Set `AUTHORIZED_API_BASE_URL` and `AUTHORIZED_API_ALLOWED_HOSTS` to the documented approved host. Add only documented endpoint methods and contract assertions. Supply secrets through Jenkins Credentials Binding or a secret manager.

## Live site maintenance
Marketplace markup, consent banners, login prompts, regional content and A/B tests can change. Locators may need maintenance. Inspect current DOM and update page objects; do not bypass access controls. Avoid parallel runs against the public site unless explicitly approved.

See `docs/architecture.md` and `docs/test-strategy.md`.


## GitLab CI: make execution visible to your manager

The repository includes `.gitlab-ci.yml`. When pushed to GitLab, the pipeline runs:
1. TypeScript and lint checks.
2. Guest Flipkart smoke scenarios.
3. Main-branch regression scenarios.
4. Allure report generation and artifact publishing.

### GitLab setup
1. Create a **private** GitLab project, for example `qa/flipkart-playwright-automation`.
2. Push this repository to the project.
3. Ensure a GitLab Runner is enabled and supports Docker images/services.
4. Enable pipeline and job artifacts. The CI file starts an isolated QA MySQL service.
5. Open **Build > Pipelines** to show the latest run to your manager.
6. Open a successful pipeline and share its URL. The JUnit test report is available from the pipeline/job test report view; download Allure HTML from job artifacts.

### Git commands
```bash
git init
git add .
git commit -m "Initial Flipkart Playwright Cucumber automation framework"
git branch -M main
git remote add origin https://gitlab.com/<your-group>/<your-project>.git
git push -u origin main
```

If the directory is already a Git repository, do not run `git init` again. Add or update the `origin` remote as appropriate.

### What your manager can review
- Repository code and framework architecture.
- `.gitlab-ci.yml` showing repeatable execution.
- Pipeline history and commit association.
- Passed/failed/skipped JUnit test results.
- Allure report, screenshots and Playwright traces attached to the pipeline.
- QA-owned MySQL evidence schema and run history.

### Recommended sharing model
Keep the project private and add your manager as a Reporter or Developer according to your company's GitLab access policy. Do not commit `.env`, personal browser session state, passwords, OTPs, API secrets or production data. Use GitLab CI/CD variables for approved secrets.

**Execution honesty:** A green GitLab pipeline is the evidence that the configured jobs ran successfully. Do not describe the project as executed until the first pipeline has completed. Live Flipkart behavior can vary by region, session, markup, availability and anti-automation controls.
