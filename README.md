# U.S. College Finder

[![Maintainability](https://api.codeclimate.com/v1/badges/74f953d2eba0abd1f240/maintainability)](https://codeclimate.com/github/coforma/swift-tech-challenge/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/74f953d2eba0abd1f240/test_coverage)](https://codeclimate.com/github/coforma/swift-tech-challenge/test_coverage)

Coforma's response to the SWIFT technical challenge

## Table of Contents

- [Getting Started](#getting-started)
- [Testing](#testing)
- [Analytics](#analytics)
- [Decision Documentation](#decision-documentation)

## Getting Started

### One time only

Before developing locally, you'll need to install some tools. You may have some of these already, or you may not.

- Install [nvm](https://github.com/nvm-sh/nvm):

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  ```

- Use nvm to install specified version of [node](https://nodejs.org/en):
  ```bash
  cd <project-directory>
  nvm use # attempts to set local node version to repo-specified version
  nvm install # only needs to be run if nvm use cannot find correct version
  ```
- Install [yarn](https://classic.yarnpkg.com/en/docs/install):

  ```bash
  brew install yarn
  ```

- Install [pre-commit](https://pre-commit.com/#install):

  ```bash
  # only need to run one of the following
  brew install pre-commit
  pip install pre-commit
  ```

- Install pre-commit [git hook scripts](https://pre-commit.com/#3-install-the-git-hook-scripts):

  ```bash
  cd <project-directory>
  pre-commit install # installs git hook scripts for repo
  ```

- Install [adr-tools](https://github.com/npryce/adr-tools/tree/master):

  ```bash
  brew install adr-tools
  ```

### Before making commits

This repository requires signed commits, so you will need to configure them. See instructions on [GitHub](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

### Running the local development server

To run the local development server:

```bash
yarn install # checks dependencies and installs as needed
yarn dev # runs the development server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the locally running application.

### Connecting to DynamoDB locally

Export AWS Credentials for a user with access to the AWS DynamoDB in your terminal before running the application

## Testing

### Unit Testing

We use [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to facilitate unit testing. Unit tests can be run manually via the CLI, but will also run on every commit for each branch in the CI pipeline.

To run manually, do one of the following:

```bash
yarn test # runs all unit tests
yarn test:cov # runs all unit tests and reports coverage
```

#### Code Quality and Test Coverage

We use [Code Climate](https://codeclimate.com/quality) for automated code review. You can track test coverage and maintainability by clicking the links at the top of this document.

### Integration Testing

We use [Cypress](https://www.cypress.io/) to facilitate integration and end-to-end (e2e) testing. Integration tests can be run manually via the CLI, but will also run on every commit for each branch in the CI pipeline.

To run manually, do one of the following:

```bash
yarn test:cy:run # runs all cypress tests
yarn test:cy:open # opens the browser-based cypress ui so tests can be individually selected and run
```

### Accessibility Testing

We use [axe](https://www.deque.com/axe/) for automated accessibility testing. Additionally, unit tests make use of the  [jest-axe](https://github.com/nickcolley/jest-axe) library, and integration tests make use of the [cypress-axe](https://github.com/component-driven/cypress-axe) library.

These tests can be run manually via the CLI by running unit tests and integration tests, but will also run on every commit for each branch in the CI pipeline.

## Analytics

Mixpanel is a customer and product analytics platform that we use to track analytics related to traffic and user behavior. This helps us better meet user needs by monitoring application usage so we can improve product performance and behavior.

It's best practice to separate your tracked data by environment. We have two separate Mixpanel projects set up: [Test](https://mixpanel.com/project/3250005/view/3758561/app/boards#discover) (used for testing conducted in lower environments) and [Prod](https://mixpanel.com/project/3250083/view/3758651/app/boards) (used for tracking production data). This data can be seen after invitation and authentication.

### Using Mixpanel

Mixpanel has excellent documentation for JavaScript, which can be found in the [JavaScript documentation here](https://docs.mixpanel.com/docs/tracking-methods/sdks/javascript). This includes information on user and event tracking. While client-side tracking is necessary to an extent, server-side tracking is more reliable. Documentation for server-side tracking can be found in the [Node.js documentation here](https://docs.mixpanel.com/docs/tracking-methods/sdks/nodejs).

## Decision Documentation

### Using adr-tools

This repository makes use of [adr-tools](https://github.com/npryce/adr-tools/tree/master) to record architectural decisions as part of the code base.

There are two uses for this, recording a new decision and superseding an existing decision.

#### Recording a new decision

To create a new decision use the adr new command:

```bash
 adr new <decision-title>
```

#### Superseding an existing decision

To overwrite an existing decision you can add the -s flag followed by which is getting overwritten. In this example we are overwriting decision 9 with an updated decision:

```bash
adr new -s 9 <decision-title>
```
