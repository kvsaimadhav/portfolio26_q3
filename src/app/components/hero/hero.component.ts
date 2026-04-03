import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;

  // State Management
  isLoaded: boolean = false;
  profilePhoto: string = 'assets/images/profile-photo-v2.jpg';
  private destroy$ = new Subject<void>();

  // Animation timing
  private animationDelay = 300;

  constructor() {}

  ngOnInit(): void {
    this.initializeComponent();
    this.setupIntersectionObserver();
    this.preloadProfileImage();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize component on load
   */
  private initializeComponent(): void {
    // Trigger animations after a short delay
    setTimeout(() => {
      this.isLoaded = true;
    }, this.animationDelay);

    // Track analytics or events
    this.trackHeroView();
  }

  /**
   * Setup Intersection Observer for lazy animations
   */
  private setupIntersectionObserver(): void {
    if (!this.heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isLoaded = true;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(this.heroSection.nativeElement);
  }

  /**
   * Preload profile image for better performance
   */
  private preloadProfileImage(): void {
    const img = new Image();
    img.src = this.profilePhoto;
    img.onload = () => {
      // Image loaded successfully
    };
    img.onerror = () => {
      console.warn('Failed to preload profile image');
      this.handleImageError(null);
    };
  }

  /**
   * Handle image loading errors
   */
  handleImageError(event: any): void {
    console.error('Profile image failed to load');
    // Fallback to placeholder or default image
    this.profilePhoto = 'assets/images/profile-fallback.jpg';
  }

  /**
   * Scroll to contact section
   */
  scrollToContact(event: Event): void {
    event.preventDefault();
    this.smoothScroll('contact');
  }

  /**
   * Scroll to projects section
   */
  scrollToProjects(event: Event): void {
    event.preventDefault();
    this.smoothScroll('projects');
  }

  /**
   * Smooth scroll to section by ID
   */
  private smoothScroll(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Section with ID '${sectionId}' not found`);
      return;
    }

    const headerOffset = 80; // Adjust based on sticky header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Track scroll action
    this.trackScrollAction(sectionId);
  }

  /**
   * Track hero view for analytics
   */
  private trackHeroView(): void {
    try {
      // Google Analytics or custom tracking
      if ((window as any).gtag) {
        (window as any).gtag('event', 'hero_viewed', {
          section: 'hero',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  /**
   * Track scroll actions for analytics
   */
  private trackScrollAction(target: string): void {
    try {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'hero_scroll', {
          target_section: target,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  /**
   * Download resume (alternative method)
   */
  downloadResume(): void {
    const link = document.createElement('a');
    link.href = '/assets/SaiMadhav_Resume.pdf';
    link.download = 'SaiMadhav_Resume.pdf';
    link.click();

    // Track download
    this.trackDownload();
  }

  /**
   * Track resume download
   */
  private trackDownload(): void {
    try {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'resume_download', {
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  /**
   * Get responsive breakpoints
   */
  getResponsiveClass(): string {
    const width = window.innerWidth;
    if (width < 480) return 'mobile';
    if (width < 768) return 'tablet';
    if (width < 1024) return 'laptop';
    return 'desktop';
  }
}
