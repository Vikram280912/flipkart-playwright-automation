@network @regression
Feature: Network stubbing in controlled QA environment
 Scenario: Mock QA-owned search service outage
  When I stub the QA mock search service with status 503
  Then the QA mock search service should return status 503
