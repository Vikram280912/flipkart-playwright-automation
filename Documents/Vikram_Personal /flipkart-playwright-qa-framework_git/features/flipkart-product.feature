@regression @product @guest
Feature: Flipkart product details
 Scenario: Open a product from search results
  Given I open the Flipkart homepage
  When I search Flipkart for "laptop"
  Then search results should be displayed
  When I open the first product
  Then the product details page should be displayed
