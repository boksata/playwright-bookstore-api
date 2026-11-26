import type { Book } from '../models/book';

export const newBook: Book = {
  id: 201,
  title: 'Playwright API test book',
  description: 'A book created by an API automation test.',
  pageCount: 321,
  excerpt: 'A reusable test excerpt.',
  publishDate: '2025-01-02T03:04:05Z',
};

export const updatedBook: Book = {
  id: 1,
  title: 'Updated Playwright API test book',
  description: 'Updated book description.',
  pageCount: 654,
  excerpt: 'Updated test excerpt.',
  publishDate: '2025-02-03T04:05:06Z',
};

export const boundaryBook: Book = {
  id: 202,
  title: '',
  description: '',
  pageCount: 0,
  excerpt: '',
  publishDate: '0001-01-01T00:00:00Z',
};
