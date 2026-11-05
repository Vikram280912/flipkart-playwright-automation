# Test strategy

Guest checks: homepage availability, search keywords, result presence, product title/price text, product detail navigation and network activity.

Authenticated checks: manual login only when required and authorized. Do not automate OTP/CAPTCHA or store personal credentials. Session state is sensitive.

API: use only documented endpoints with written permission. Configure the exact hostname allowlist and secrets through a secret manager. Never infer private endpoints from browser traffic.

Database: save test run metadata, observed public product evidence and authorized API test evidence in QA-owned MySQL. This is not a mirror of Flipkart data.

Non-goals: scraping at scale, private endpoint discovery, bypassing bot protection, real purchase/payment/order submissions.
