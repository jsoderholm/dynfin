# Dynfin

This project is a webapp for linking news data to stock information. It works by using two APIs, [Finage](https://finage.co.uk/) and [Stock News API](https://www.stocknewsapi.com/). The goal of the project is to give users more information regarding how news impacts stocks and companies directly.

## Installation

This project utilizes Yarn Plug'n'Play (PnP) for managing dependencies, which offers improved performance and reliability. Please follow the instructions below to set up the project environment and get started.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en) (or using [nvm](https://github.com/nvm-sh/nvm))
- [Yarn](https://yarnpkg.com/)

### Initial Setup

Install project dependencies using Yarn Plug'n'Play (PnP):

```sh
yarn
```

Smart IDEs (such as VSCode or IntelliJ) require special configuration for TypeScript to work when using Yarn Plug'n'Play (PnP). The editor SDKs and settings can be generated using:

```sh
yarn dlx @yarnpkg/sdks vscode vim ... # Generate both the base SDK and the editor settings
yarn dlx @yarnpkg/sdks # Update all installed SDKs & editor settings
```

## Development

To start the development server, run the following command:

```sh
yarn dev
```

### Running Firebase Emulators

Firebase emulators provide a convenient way to develop and test Firebase features locally on your machine. Instead of interacting with production services, you can run emulated versions of Firebase Auth and Cloud Firestore.

To start the Firebase emulators locally, run the following command:

```sh
yarn firebase emulators:start
```

### Formatting Code

To format the code using Prettier, run:

```sh
yarn format
```

### Linting Code

To lint the code using ESLint, run:

```sh
yarn lint
```

## Third party components

In this project we have decided to use the [shadcn/ui](https://ui.shadcn.com/) component library. As a result almost all of the components used in the project are third party components. We have used this component library throughout the whole developement to more easily adhere to a specific style across the whole app.

For the graph view we have used [recharts](https://recharts.org/en-US/) library components.

We have also used icons from [tabler icons](https://tabler.io/icons).
