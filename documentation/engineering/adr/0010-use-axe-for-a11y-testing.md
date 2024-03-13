# 10. use-axe-for-a11y-testing

Date: 2024-03-11

## Status

Accepted

## Status

Accepted

## Context

Accessibility is an extremely important aspect of web development, and
ensuring a site is accessible is important to us. Axe by Deque is THE
automated accessibility testing tool. Along with libraries specifically
for unit testing (jest-axe) and integration testing (cypress-axe), it
gives us the ability to monitor accessibilty at every step of the
development process.

## Decision

Install and use Axe tools (axe-core, jest-axe, cypress-axe) for automated
accessibility testing in both unit, integration, and component tests.

## Consequences

The Axe tools noted above will be installed as testing tools and will be
available for developers when writing automated tests.
