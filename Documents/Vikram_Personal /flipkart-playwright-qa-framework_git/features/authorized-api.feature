@api @manual-configuration
Feature: Authorized API validation

  # Example only: set an approved API base URL, hostname allowlist and documented endpoint.
  # Replace /health with an endpoint from your authorized API specification.
  Scenario: Validate an authorized API health endpoint
    When I call the authorized GET endpoint "/health"
    Then the authorized API status should be 200
