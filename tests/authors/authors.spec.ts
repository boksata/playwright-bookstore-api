import { test, expect } from '../../src/fixtures/api.fixture';
import type { Author } from '../../src/models/author';
import { newAuthor, updatedAuthor } from '../../src/test-data/authors';

test.describe('Authors API', () => {
  test('GET /Authors returns a non-empty list of authors', async ({ authorsApi }) => {
    const response = await authorsApi.getAll();

    expect(response.status()).toBe(200);
    const authors = (await response.json()) as Author[];
    expect(authors.length).toBeGreaterThan(0);
    expect(authors[0]).toMatchObject({
      id: expect.any(Number),
      idBook: expect.any(Number),
      firstName: expect.any(String),
      lastName: expect.any(String),
    });
  });

  test('GET /Authors/{id} returns the requested author', async ({ authorsApi }) => {
    const response = await authorsApi.getById(1);

    expect(response.status()).toBe(200);
    const author = (await response.json()) as Author;
    expect(author.id).toBe(1);
    expect(author.idBook).toEqual(expect.any(Number));
    expect(author.firstName).toBeTruthy();
    expect(author.lastName).toBeTruthy();
  });

  test('GET /Authors/{id} returns 404 for an unknown author', async ({ authorsApi }) => {
    const response = await authorsApi.getById(999999);

    expect(response.status()).toBe(404);
    expect(await response.json()).toMatchObject({ status: 404 });
  });

  test('POST /Authors creates an author and returns its payload', async ({ authorsApi }) => {
    const response = await authorsApi.create(newAuthor);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(newAuthor);
  });

  test('PUT /Authors/{id} updates an author and returns the updated payload', async ({
    authorsApi,
  }) => {
    const response = await authorsApi.update(updatedAuthor.id, updatedAuthor);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(updatedAuthor);
  });

  test('DELETE /Authors/{id} returns success with an empty response body', async ({
    authorsApi,
  }) => {
    const response = await authorsApi.delete(1);

    expect(response.status()).toBe(200);
    expect(await response.text()).toBe('');
  });
});
