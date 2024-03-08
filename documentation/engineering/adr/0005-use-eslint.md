# 5. use-eslint

Date: 2024-03-08

## Status

Accepted

## Context

There are often many ways to write or style similarly functional code. Agreeing
on a styleguide can have multiple benefits, including helping teams avoid
spending time arguing over such things and reducing commit sizes from
unecessary minor style tweaks (either manual or editor-automated ones).

ESLint will ensure that we're writing code using the same styles, but will go
even further by helping to prevent common errors in the React and Next.js
landscape and improving our overall code quality using plugins like
[next/core-web-vitals](https://nextjs.org/docs/app/building-your-application/configuring/eslint#core-web-vitals)
and
[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks).

## Decision

Install and configure ESLint for all frontend code. Use standard rules with
some tweaks. Enforce these rules through further tooling.

## Consequences

ESLint will be made available to developers' editors and will run on every
commit and pull request.
