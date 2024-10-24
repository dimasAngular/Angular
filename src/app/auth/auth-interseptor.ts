import { TokenResponse } from './auth-interface';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpEvent } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { catchError, switchMap, throwError, Observable, BehaviorSubject, filter, take } from "rxjs";

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token: string | null = authService.token;

  if (!token) return next(req);

  return next(addToken(req, token)).pipe(
    catchError(error => {
      if (error.status === 403) {
        return handle403Error(authService, req, next); // Обновляем токен и повторяем запрос
      }
      return throwError(error);
    })
  );
};

// Функция для добавления токена в заголовки
const addToken = (req: HttpRequest<any>, token: string): HttpRequest<any> => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Функция для обработки ошибок 403 и обновления токена
const handle403Error = (authService: AuthService, req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshAuthToken().pipe(
      switchMap((res: TokenResponse) => {
        isRefreshing = false;
        refreshTokenSubject.next(res.access_token);  // Передаём новый токен в BehaviorSubject
        return next(addToken(req, res.access_token));
      }),
      catchError(error => {
        isRefreshing = false;
        authService.logout(); // Если обновление токена не удалось, выполняем logout
        return throwError(error);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token => next(addToken(req, token as string)))
    );
  }
};
