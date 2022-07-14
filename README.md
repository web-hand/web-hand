# web-hand

## Scripts

Below you can find all scripts you can use inside this repository

- `npm run start` → starts webpack in watch mode with **ts-loader** compiler
- `npm run build` → creates project production build using webpack with **swc** compiler
- `npm run pretyprint` → run code prettier code formatter for all files inside project **root** directory and print all
  issues
- `npm run pretyprint:fix` → run code prettier (code formatter) for all files inside project **root** directory and fix
  all fixable issues
- `npm run lint` → run eslint (static code analysis tool) for all _`.ts`_ connected with _src/index.ts_ and print all
  issues
- `npm run lint:fix` → run eslint (static code analysis tool) for all _`.ts`_ connected with _src/index.ts_ and fix all
  fixable issues
- `npm run test` → run all tests in project. To run single test suite simple pass file name (`npm run test app.spec.ts`)
- `npm run test:coverage` → run tests and generates tests coverage report
- `npm run test:watch` → run tests in watch mode. If you change any test case tests will be re-triggered
- `npm run test:watch:coverage` → run tests in watch mode and generates coverage reports every time tests get
  re-triggered
