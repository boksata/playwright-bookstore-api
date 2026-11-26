# Bookstore API test automation

Playwright API tests written in TypeScript for the Books and Authors endpoints of
the [Fake REST API](https://fakerestapi.azurewebsites.net/index.html).

## Project layout

```text
src/
  api/          Reusable Books and Authors request clients
  fixtures/     Shared Playwright API fixtures
  models/       TypeScript request/response shapes
  test-data/    Reusable request payloads
tests/
  books/        Books CRUD, response-contract, and edge-case tests
  authors/      Authors CRUD and response-contract tests
playwright.config.ts
tsconfig.json
```

## Run tests

```sh
npm ci
npm test
npm run test:books
npm run test:authors
npm run typecheck
```

The configured HTML reporter writes a per-test pass/fail report to
`playwright-report/` after each run. Open it with:

```sh
npm run report
```

Set `API_BASE_URL` to target another compatible API URL; the default is
`https://fakerestapi.azurewebsites.net/api/v1/`.

The fake service does not persist POST, PUT, or DELETE changes. Each CRUD test
therefore checks its own response and does not rely on state created by another
test. The Books suite also checks the 404 response for a missing ID and accepts
valid boundary values such as an empty text field and a zero page count.
