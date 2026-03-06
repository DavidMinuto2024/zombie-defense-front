import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_CONFIG } from './api-config';

/**
 * Adds X-api-key header to outgoing requests. Only applies to requests to the configured API base URL.
 */
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(API_CONFIG);
  if (!config.apiKey || !req.url.startsWith(config.baseUrl)) {
    return next(req);
  }
  const cloned = req.clone({
    setHeaders: { 'X-api-key': config.apiKey },
  });
  return next(cloned);
};
