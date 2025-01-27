import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from "@angular/platform-browser/animations"

import { routes } from './app.routes';
import { provideHotToastConfig } from "@ngxpert/hot-toast";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHotToastConfig(),
    provideAnimations()
  ]
};
