# web-hand

![build](https://github.com/web-hand/web-hand/actions/workflows/push-master-and-create-code-coverage-report.yml/badge.svg)
![Coverage Status](https://coveralls.io/repos/github/web-hand/web-hand/badge.svg)
![GitHub license](https://img.shields.io/github/license/web-hand/web-hand)

## Requirements

Before you will use this repository make sure that you have installed:

- **_Git_**

  - If you are a **Windows** or **macOS** user visit this link **[Downloading Git](https://git-scm.com/download/win)** then download appropriate
    installer and install it.
  - If you are a **Linux** (Ubuntu-based distribution) user you can paste bellow scrip into your terminal or visit this page
    **[Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)**

    ```bash
    sudo apt install git-all
    ```

- **_Node.js_** and **_npm_**

  - If you are a **Windows** or **macOS** user visit this link **[Node.js download](https://nodejs.org/en/download/)** then download _LTS_ version for
    Windows and install it.
  - If you are a **Linux** (Ubunto-based distribution) user you can paste bellow scrip into your terminal or visit this page
    **[Node installation instruction](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)** or use
    **[nvm](https://github.com/nvm-sh/nvm#install--update-script)**

    ```bash
    curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

    > You have to install node.js in version at least 17

If you followed every step, you should be ready to start using this repository. To make sure that you have installed everything correctly open your
terminal git-bash and run the following commands:

- To check **git**: _`git --version`_ → you shoud see output with **git** version
- To check **node.js**: _`node --version`_ → you shoud see output with **node.js** version
- To check **npm**: _`npm --version`_ → you shoud see output with **npm** version

## Downloading the repository

- Open your terminal / git-bash in location where you create a directory which will contain this repository

- Run the following command in your terminal / git-bash

  ```bash
  git clone https://github.com/web-hand/web-hand.git
  cd ./web-hand
  ```

## Scripts

Below you can find all scripts you can use inside this repository

- `npm run serve` → starts webpack dev server over https under 8080 port
- `npm run build` → creates project production build using webpack with **swc** compiler
- `npm run prettyprint` → run code prettier code formatter for all files inside project **root** directory and print all issues
- `npm run prettyprint:fix` → run code prettier (code formatter) for all files inside project **root** directory and fix all fixable issues
- `npm run lint` → run eslint (static code analysis tool) for all _`.ts`_ connected with _src/index.ts_ and print all issues
- `npm run lint:fix` → run eslint (static code analysis tool) for all _`.ts`_ connected with _src/index.ts_ and fix all fixable issues
- `npm run test` → run all tests in project. To run single test suite simple pass file name (`npm run test app.spec.ts`)
- `npm run test:coverage` → run tests and generates tests coverage report
- `npm run test:watch` → run tests in watch mode. If you change any test case tests will be re-triggered
- `npm run test:watch:coverage` → run tests in watch mode and generates coverage reports every time tests get re-triggered
- `npm run test:external:coverage` → run tests and generates tests coverage report for external services
