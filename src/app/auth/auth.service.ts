import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth-interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';  // Необходимо для навигации

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  cookieService: CookieService = inject(CookieService);
  router: Router = inject(Router);  // Внедрение Router

  baseUrl: string = 'https://icherniakov.ru/yt-course/auth/';
  
  token: string | null = null;
  refresh: string | null = null;

  safeTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refresh = res.refresh_token;
    this.cookieService.set('token', this.token);
    this.cookieService.set('refresh', this.refresh);
  }

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refresh = this.cookieService.get('refresh');  // Исправление, используем корректный ключ для refresh токена
    }
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd: FormData = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(`${this.baseUrl}token`, fd)
      .pipe(
        tap(val => this.safeTokens(val))
      );
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.baseUrl}refresh`, 
      { refresh_token: this.refresh }  // Используем refresh токен правильно
    ).pipe(
      tap(val => this.safeTokens(val)),
      catchError(error => {
        this.logout();
        return throwError(error);
      })
    );
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refresh = null;  // Очищаем переменную refresh
    this.router.navigate(['/login']);
  }
}
