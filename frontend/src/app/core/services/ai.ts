import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AiService {
  private api = `${environment.apiUrl}/ai`;
  constructor(private http: HttpClient) {}

  generateSiteTexts(projectId: number, webType: string, language = 'es') {
    return this.http.post<any>(`${this.api}/site-texts`, { projectId, webType, language });
  }

  generatePages(projectId: number, webType: string, language = 'es') {
    return this.http.post<any>(`${this.api}/generate-pages`, { projectId, webType, language });
  }

  generatePost(projectId: number, webType: string, topic: string, language = 'es', publish = false) {
    return this.http.post<any>(`${this.api}/generate-post`, { projectId, webType, topic, language, publish });
  }

  getSeoSuggestions(projectId: number, webType: string, keywords: string[] = []) {
    return this.http.post<any>(`${this.api}/seo-suggestions`, { projectId, webType, keywords });
  }

  chat(messages: any[], projectId?: number) {
    return this.http.post<any>(`${this.api}/chat`, { messages, projectId });
  }

  generateTheme(projectId: number, webType: string, themeConfig: any) {
    return this.http.post<any>(`${this.api}/generate-theme`, { projectId, webType, themeConfig });
  }

  generateInstallerTexts(siteName: string, webType: string, language = 'es') {
    return this.http.post<any>(`${this.api}/installer-texts`, { siteName, webType, language });
  }
}
