import { authTokenInterceptor } from './auth/auth-interseptor';
import { HttpInterceptor } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { FormControl, FormGroup } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes) ,  provideHttpClient(withInterceptors([authTokenInterceptor])), 
   ]
};
