import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'pending' | 'installing' | 'installed' | 'error';
  wp_url: string;
  wp_admin_url: string;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) {}

  getAll()              { return this.http.get<Project[]>(this.apiUrl); }
  create(data: any)     { return this.http.post<Project>(this.apiUrl, data); }
  remove(id: number)    { return this.http.delete(`${this.apiUrl}/${id}`); }
}
