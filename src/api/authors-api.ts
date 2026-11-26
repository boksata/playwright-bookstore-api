import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { Author } from '../models/author';

export class AuthorsApi {
  constructor(private readonly request: APIRequestContext) {}

  getAll(): Promise<APIResponse> {
    return this.request.get('Authors');
  }

  getById(id: number): Promise<APIResponse> {
    return this.request.get(`Authors/${id}`);
  }

  create(author: Author): Promise<APIResponse> {
    return this.request.post('Authors', { data: author });
  }

  update(id: number, author: Author): Promise<APIResponse> {
    return this.request.put(`Authors/${id}`, { data: author });
  }

  delete(id: number): Promise<APIResponse> {
    return this.request.delete(`Authors/${id}`);
  }
}
