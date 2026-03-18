import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getStats()                          { return this.http.get<any>(`${this.api}/stats`); }
  getUsers()                          { return this.http.get<any[]>(`${this.api}/users`); }
  blockUser(id: number, blocked: boolean) { return this.http.patch(`${this.api}/users/${id}/block`, { blocked }); }
  deleteUser(id: number)              { return this.http.delete(`${this.api}/users/${id}`); }
  updatePlan(id: number, plan: string){ return this.http.patch(`${this.api}/users/${id}/plan`, { plan }); }
  makeAdmin(id: number, role: string) { return this.http.patch(`${this.api}/users/${id}/role`, { role }); }
  resetPassword(userId: number, newPassword: string) {
    return this.http.post(`${this.api}/users/reset-password`, { userId, newPassword });
  }

  impersonate(id: number)             { return this.http.post<any>(`${this.api}/users/${id}/impersonate`, {}); }
  getAllProjects()                     { return this.http.get<any[]>(`${this.api}/projects`); }
  deleteProject(id: number)           { return this.http.delete(`${this.api}/projects/${id}`); }
  getLogs(type: string, lines: number){ return this.http.get<any>(`${this.api}/logs?type=${type}&lines=${lines}`); }
}
