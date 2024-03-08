# 6. use-uswds-styles

Date: 2024-03-08

## Status

Accepted

## Context

As specified, we will be using USWDS as a styling system, and in addition
we will be using USWDS React components.

Component libraries are a collection of "pieces" of a frontend that can are
already made and ready to slot into another website. Using a well-made
component library can reduce development costs and increase test coverage,
since the components are all already fully tested upstream.

## Decision

Use USWDS styles and the USWDS React component library.

## Consequences

USWDS will serve as our baseline styling solution, and developers will have
access to React bindings for a wide array of common web components as created
by USWDS and implemented in React by Trussworks.

Custom CSS is still allowed and will still function as expected. Occasionally,
designers will want to deviate from the USWDS design to better serve user needs.
