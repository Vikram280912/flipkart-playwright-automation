# Manager handoff: Flipkart UI automation framework

## Purpose
Demonstrate a maintainable Playwright + TypeScript + Cucumber BDD framework against guest-accessible Flipkart journeys, with QA-owned evidence storage and GitLab CI execution.

## What can be reviewed
- Gherkin feature files and data-driven search examples.
- Page Object Model and scenario-scoped Cucumber World/hooks.
- Playwright browser/network observation.
- Controlled network stub on a QA-owned synthetic host.
- Allowlisted API client for documented and authorized endpoints.
- QA-owned MySQL run/evidence records.
- GitLab CI jobs, JUnit report and Allure artifacts.

## Current scope and constraints
- Guest search and product detail navigation are included.
- Manual login/session capture is optional and must be handled by an authorized tester.
- Flipkart private APIs and internal database are not included or assumed accessible.
- MySQL is QA-owned evidence storage, not Flipkart's production database.
- The public website may change its markup or restrict automation; selectors and execution cadence require maintenance.

## Evidence to attach after first GitLab run
1. GitLab pipeline URL and commit SHA.
2. Pipeline status screenshot.
3. JUnit test report showing scenario outcomes.
4. Allure report summary.
5. One failure trace/screenshot if a test failed, with sensitive data removed.

Do not claim a pass rate until the pipeline actually runs.
