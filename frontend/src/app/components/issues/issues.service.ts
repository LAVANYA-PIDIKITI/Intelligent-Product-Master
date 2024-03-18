import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = 'https://lavlav.atlassian.net/rest/api/3/events';
  private authString = 'bGF2YW55YXBpZGlraXRpLjI0Y3NAbGljZXQuYWMuaW46QVRBVFQzeEZmR0YwMGEyaHVXX2FSWVJsT20zclZOTkNkbmp6emFBYTQ5cUVKX3ZOWHB1bTVMX1MyMVVIdTBMcDBBZ05SdWliN3Q3YlNyWFIwOENfWFBMTjNYODJfMFA0RGxvb1hRa0FfOENlV2RKZU52TVRYcXRQYUR4MXdrLXNWWXdCUDdXOUxRMVJJaGpUZFBMRHdETURLSU5tYVQzQlRJTUFidi1xbTkzUHBkVzVYRWpuR1ZFPUNEMjg5RjFF';

  constructor(private http: HttpClient) { }
  private handleError(error: any) {
    console.error('API Error:', error); // Log any API errors
    return throwError(error);
  }
  getIssues(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic bGF2YW55YXBpZGlraXRpLjI0Y3NAbGljZXQuYWMuaW46QVRBVFQzeEZmR0YwMGEyaHVXX2FSWVJsT20zclZOTkNkbmp6emFBYTQ5cUVKX3ZOWHB1bTVMX1MyMVVIdTBMcDBBZ05SdWliN3Q3YlNyWFIwOENfWFBMTjNYODJfMFA0RGxvb1hRa0FfOENlV2RKZU52TVRYcXRQYUR4MXdrLXNWWXdCUDdXOUxRMVJJaGpUZFBMRHdETURLSU5tYVQzQlRJTUFidi1xbTkzUHBkVzVYRWpuR1ZFPUNEMjg5RjFF',
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(this.apiUrl, { headers: headers }).pipe(
        tap((data: any) => console.log('API Response:', data)), // Print the API response
        catchError(this.handleError) // Handle errors
      );
    }

}
