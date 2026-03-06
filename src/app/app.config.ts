import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { API_CONFIG } from './core/api/api-config';
import { apiKeyInterceptor } from './core/api/api-key.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: environment.apiBaseUrl,
        apiKey: environment.apiKey,
      },
    },
  ],
};
