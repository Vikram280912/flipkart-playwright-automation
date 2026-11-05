@smoke @regression @search @guest
Feature: Flipkart guest product search
 Background:
  Given I open the Flipkart homepage
 Scenario Outline: Search product keywords
  When I search Flipkart for "<keyword>"
  Then search results should be displayed
  And the first product should have a visible title
  And Flipkart network activity should have been observed
 Examples:
  | keyword |
  | laptop |
  | mobile |
  | shoes |
