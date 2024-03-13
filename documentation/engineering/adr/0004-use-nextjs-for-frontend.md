# 4. Use NextJS for frontend

Date: 2024-03-07

## Status

Accepted

## Context

Modern websites tend to be complex software projects that need to solve many
different problems in order to bring the necessary designs and features to
fruition. State management, component reuse, data binding, network actions, and
more are all separate functions that nonetheless need to work together
seamlessly in order to realize the goals of the product.

Using a modern, popular, standard frontend framework is therefore helpful, even
necessary, in building complex websites.

While there are a number of strong contenders available today for this task,
the engineers implementing this website have existing familiarity with Next.js
and are pleased with its overall approach, power, flexibility, documentation,
and principles. It brings extremely valuable tools such as server actions,
dynamic routing, and flexible rendering techniques to bear on top of an already
powerful React library. Further, many other tools that are helpful or necessary
in creating a strong frontend (testing suites, styling tools, etc.) are tested
with and even officially supported within a Next.js application.

## Decision

We will use Next.js as our frontend framework.

## Consequences

Many aspects of frontend development becomes easier and features and tools become available
to us. Anyone joining the team with familiarity with React will have a very
good start on understanding the codebase. Anyone missing familiarity with both
React and Next.js will have a very hard time getting started. Switching costs
to another framework are exceptionally high.
