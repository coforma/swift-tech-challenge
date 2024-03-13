# 13. use-dependabot

Date: 2024-03-13

## Status

Accepted

## Context

We need to maintain code security by monitoring for vulnerabilities in dependencies. By keeping dependencies updated, we can minimize the number of vulnerabilities in a codebase. GitHub's Dependabot identifies vulnerabilities and provides alerting and automatic updates to code, which allows us to ensure the repository does not include vulnerable dependencies.

## Decision

Utilize Dependabot for vulnerability monitoring and dependency management.

## Consequences

Developers will be able to easily monitor vulnerabilities and manage dependencies from within the GitHub interface. Non-major updates will be automerged.
