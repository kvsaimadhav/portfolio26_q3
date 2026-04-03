import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private currentSection = new BehaviorSubject<string>('home');
  currentSection$ = this.currentSection.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  scrollTo(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        this.currentSection.next(sectionId);
      }
    }
  }

  updateActiveSection(sectionId: string): void {
    this.currentSection.next(sectionId);
  }
}