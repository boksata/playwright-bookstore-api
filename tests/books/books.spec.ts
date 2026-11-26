import { test, expect } from '../../src/fixtures/api.fixture';
import type { Book } from '../../src/models/book';
import { boundaryBook, newBook, updatedBook } from '../../src/test-data/books';

test.describe('Books API', () => {
  test('GET /Books returns a non-empty list of books', async ({ booksApi }) => {
    const response = await booksApi.getAll();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const books = (await response.json()) as Book[];
    expect(books.length).toBeGreaterThan(0);
    expect(books[0]).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      description: expect.any(String),
      pageCount: expect.any(Number),
      excerpt: expect.any(String),
      publishDate: expect.any(String),
    });
  });

  test('GET /Books/{id} returns the requested book', async ({ booksApi }) => {
    const response = await booksApi.getById(1);

    expect(response.status()).toBe(200);
    const book = (await response.json()) as Book;
    expect(book.id).toBe(1);
    expect(book.title).toBeTruthy();
    expect(book.pageCount).toEqual(expect.any(Number));
    expect(Number.isNaN(Date.parse(book.publishDate))).toBe(false);
  });

  test('GET /Books/{id} returns 404 for an unknown book', async ({ booksApi }) => {
    const response = await booksApi.getById(999999);

    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toContain('application/problem+json');
    expect(await response.json()).toMatchObject({ status: 404 });
  });

  test('POST /Books creates a book and returns its payload', async ({ booksApi }) => {
    const response = await booksApi.create(newBook);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(newBook);
  });

  test('POST /Books accepts boundary values such as zero pages and empty text', async ({
    booksApi,
  }) => {
    const response = await booksApi.create(boundaryBook);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(boundaryBook);
  });

  test('PUT /Books/{id} updates a book and returns the updated payload', async ({
    booksApi,
  }) => {
    const response = await booksApi.update(updatedBook.id, updatedBook);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(updatedBook);
  });

  test('DELETE /Books/{id} returns success with an empty response body', async ({
    booksApi,
  }) => {
    const response = await booksApi.delete(1);

    expect(response.status()).toBe(200);
    expect(await response.text()).toBe('');
  });
});
