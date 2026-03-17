import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WpManagerService {
  private api = 'http://localhost:3000/api/manage';

  constructor(private http: HttpClient) {}

  getStatus(id: number)                        { return this.http.get<any>(`${this.api}/${id}/status`); }
  getMetrics(id: number)                       { return this.http.get<any>(`${this.api}/${id}/metrics`); }
  getPlugins(id: number)                       { return this.http.get<any[]>(`${this.api}/${id}/plugins`); }
  togglePlugin(id: number, plugin: string, activate: boolean) {
    return this.http.post(`${this.api}/${id}/plugins/toggle`, { plugin, activate });
  }
  installPlugin(id: number, plugin: string)    { return this.http.post(`${this.api}/${id}/plugins/install`, { plugin }); }
  deletePlugin(id: number, plugin: string)     { return this.http.delete(`${this.api}/${id}/plugins/${plugin}`); }
  getThemes(id: number)                        { return this.http.get<any[]>(`${this.api}/${id}/themes`); }
  activateTheme(id: number, theme: string)     { return this.http.post(`${this.api}/${id}/themes/activate`, { theme }); }
  installTheme(id: number, theme: string)      { return this.http.post(`${this.api}/${id}/themes/install`, { theme }); }
  getUsers(id: number)                         { return this.http.get<any[]>(`${this.api}/${id}/users`); }
  createUser(id: number, data: any)            { return this.http.post(`${this.api}/${id}/users`, data); }
  deleteUser(id: number, userId: number)       { return this.http.delete(`${this.api}/${id}/users/${userId}`); }
  getPages(id: number, pass: string)           { return this.http.get<any[]>(`${this.api}/${id}/pages?pass=${pass}`); }
  createPage(id: number, data: any)            { return this.http.post(`${this.api}/${id}/pages`, data); }
  getPosts(id: number, pass: string)           { return this.http.get<any[]>(`${this.api}/${id}/posts?pass=${pass}`); }
}
