# Description
Coforma's response to the SWIFT technical challenge

## TODO: Table of Contents

- TODO: Links here

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
    nvm use
    ```
- Install [yarn](https://yarnpkg.com/getting-started/install) via [corepack](https://yarnpkg.com/corepack):

    ```bash
    cd <project-directory>
    corepack enable
    ```

- Install [pre-commit](https://pre-commit.com/#install):

    ```bash
    brew install precommit
    ```
     OR
    ```bash
    pip install precommit

    ```

- Install pre-commit [git hook scripts](https://pre-commit.com/#3-install-the-git-hook-scripts):

    ```bash
    pre-commit install
    ```

### Before making commits

TODO: Link to signed commits, with process

### Running the local development server

To run the local development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the locally running application.

### Using adr-tools

This repository makes use of [adr-tools](https://github.com/npryce/adr-tools/tree/master) to record architectural decisions as part of the code base.

There are two uses for this, recording a new decision and superseding an existing decision.

#### Recording a new decision

To create a new decision use the adr new command:

```bash
 adr new Implement as Unix shell scripts
```

#### Superseding an existing decision

To overwrite an existing decision you can add the -s flag followed by which is getting overwritten. In this example we are overwriting decision 9 with an updated decision:

```bash
adr new -s 9 Use Rust for performance-critical functionality
```