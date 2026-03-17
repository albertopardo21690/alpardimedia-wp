import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface WpInstallConfig {
  projectId: number;
  config: {
    siteName: string;
    siteDescription: string;
    dbName: string;
    dbUser: string;
    dbPassword: string;
    dbHost: string;
    dbPrefix: string;
    adminUser: string;
    adminPassword: string;
    adminEmail: string;
    language: string;
  };
}

@Injectable({ providedIn: 'root' })
export class WordpressService {
  private apiUrl = 'http://localhost:3000/api/wordpress';

  constructor(private http: HttpClient) {}

  install(data: WpInstallConfig)       { return this.http.post(`${this.apiUrl}/install`, data); }
  uninstall(projectId: number)         { return this.http.delete(`${this.apiUrl}/uninstall/${projectId}`); }
  getStatus(projectId: number)         { return this.http.get(`${this.apiUrl}/status/${projectId}`); }
}
