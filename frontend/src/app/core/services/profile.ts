import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private api = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {}

  getProfile()                        { return this.http.get<any>(this.api); }
  updateProfile(data: any)            { return this.http.put<any>(this.api, data); }
  changePassword(data: any)           { return this.http.put<any>(`${this.api}/password`, data); }
  getActivity()                       { return this.http.get<any[]>(`${this.api}/activity`); }
  getStats()                          { return this.http.get<any>(`${this.api}/stats`); }
}
