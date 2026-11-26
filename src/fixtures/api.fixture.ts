import { test as base, expect } from '@playwright/test';
import { AuthorsApi } from '../api/authors-api';
import { BooksApi } from '../api/books-api';

type ApiFixtures = {
  authorsApi: AuthorsApi;
  booksApi: BooksApi;
};

export const test = base.extend<ApiFixtures>({
  authorsApi: async ({ request }, use) => {
    await use(new AuthorsApi(request));
  },
  booksApi: async ({ request }, use) => {
    await use(new BooksApi(request));
  },
});

export { expect };
