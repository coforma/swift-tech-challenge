# 11. use-code-climate

Date: 2024-03-12

## Status

Accepted

## Context

Code Climate is a tool that provides automated code quality and maintainability metrics, as well as providing a venue for hosting test coverage results. Testing code is important for ensuring that edge cases are met and preventing regression. Having a high level of test coverage provides confidence that deployments will provide consistent functionality. Integrating with GitHub merge checks will allow us to enforce high levels of code quality before any new code is merged.

## Decision

We will utilize Code Climate to monitor code quality and enforce standards.

## Consequences

Developers will be able to easily view code coverage metrics and track the impact of proposed changes.
