# 8. Use Jest and React Testing Library for unit testing

Date: 2024-03-11

## Status

Accepted

## Context

Testing code is important for ensuring that edge cases are met, preventing
regression, and even documentation. Choosing a common testing framework with
widespread support that plays nicely with the rest of your stack is necessary
for ensuring that you are able to test what you need to test. Jest and React
Testing Library are well-supported, widely-used testing tools supported by
Next.js.

## Decision

We will use Jest and React Testing Library for our unit and component testing.

## Consequences

Testing frontend components will be easy and follow common practices. Anyone
joining the project who has experience with other test runners like Vitest or
Jasmine will find this framework to feel similar in many regards.
