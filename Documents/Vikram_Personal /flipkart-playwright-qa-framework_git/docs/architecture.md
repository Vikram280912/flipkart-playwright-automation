# Architecture

Cucumber owns scenarios, tags, hooks, glue and reports. Each scenario gets a fresh browser context, API client, QA MySQL connection wrapper and scenario-local World.

Layers:
- Features: business-readable Gherkin
- Step definitions: orchestration only
- Pages: locators and browser interactions
- API client: allowlisted, authorized endpoint requests
- Network: request/response observer and controlled QA mock
- Database: QA evidence persistence with parameterized SQL
- Jenkins: install, static checks, guest smoke, regression and artifact publishing

Security: no credentials or OTPs in test data/logs; session state is secret; only allowlisted API hosts; MySQL is QA-owned; no destructive production cleanup.
