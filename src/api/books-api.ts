import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { Book } from '../models/book';

export class BooksApi {
  constructor(private readonly request: APIRequestContext) {}

  getAll(): Promise<APIResponse> {
    return this.request.get('Books');
  }

  getById(id: number): Promise<APIResponse> {
    return this.request.get(`Books/${id}`);
  }

  create(book: Book): Promise<APIResponse> {
    return this.request.post('Books', { data: book });
  }

  update(id: number, book: Book): Promise<APIResponse> {
    return this.request.put(`Books/${id}`, { data: book });
  }

  delete(id: number): Promise<APIResponse> {
    return this.request.delete(`Books/${id}`);
  }
}
