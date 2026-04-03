import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observer: IntersectionObserver | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  init() {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1
      });

      // Observe all elements with the 'animate-on-scroll' class
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        this.observer?.observe(el);
      });
    }
  }

  destroy() {
    this.observer?.disconnect();
  }
}