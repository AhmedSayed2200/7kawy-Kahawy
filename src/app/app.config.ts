import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: 
  [
     provideZoneChangeDetection({ eventCoalescing: true }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes ,withInMemoryScrolling({ scrollPositionRestoration:"top",anchorScrolling:"enabled" })
  ,withViewTransitions(),withHashLocation()
 ),
    provideHttpClient(withFetch())
  ]
};
