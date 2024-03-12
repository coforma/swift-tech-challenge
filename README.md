# Description

Coforma's response to the SWIFT technical challenge

## Table of Contents

- [Getting Started](#getting-started)
- [Testing](#testing)
- [Documentation](#documentation)

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

## Documentation

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
