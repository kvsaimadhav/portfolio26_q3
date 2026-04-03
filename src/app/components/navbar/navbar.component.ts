import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isDark = true;
  isMobileOpen = false;
  isScrolled = false;
  activeSection = 'home';
  private destroy$ = new Subject<void>();

  // Navigation items
  navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'contact', label: 'Contact', icon: '💬' }
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.isDark = this.themeService.isDark();
    this.trackActiveSection();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Listen for scroll events to add shadow and detect active section
   */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    this.isScrolled = scrollPosition > 50;

    // Update active section based on scroll position
    this.updateActiveSection();
  }

  /**
   * Track which section is currently in view
   */
  private trackActiveSection(): void {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, observerOptions);

    // Observe all sections
    this.navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });
  }

  /**
   * Update active section based on scroll position
   */
  private updateActiveSection(): void {
    const scrollPosition = window.scrollY + 100;

    this.navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          this.activeSection = item.id;
        }
      }
    });
  }

  /**
   * Toggle dark/light theme
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.isDark();
    this.trackThemeChange();
  }

  /**
   * Track theme change for analytics
   */
  private trackThemeChange(): void {
    try {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'theme_toggled', {
          theme: this.isDark ? 'dark' : 'light',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  /**
   * Toggle mobile menu
   */
  toggleMobile(): void {
    this.isMobileOpen = !this.isMobileOpen;
  }

  /**
   * Close mobile menu
   */
  closeMobile(): void {
    this.isMobileOpen = false;
  }

  /**
   * Smooth scroll to section
   */
  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Section with ID '${sectionId}' not found`);
      return;
    }

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    this.activeSection = sectionId;
    this.closeMobile();
    this.trackNavigation(sectionId);
  }

  /**
   * Track navigation clicks for analytics
   */
  private trackNavigation(sectionId: string): void {
    try {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'navbar_click', {
          section: sectionId,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  /**
   * Get icon for nav item
   */
  getNavIcon(iconName: string): string {
    const iconMap: { [key: string]: string } = {
      home: '🏠',
      about: '👤',
      experience: '💼',
      projects: '🚀',
      skills: '⚡',
      contact: '💬'
    };
    return iconMap[iconName] || '•';
  }

  /**
   * Check if nav item is active
   */
  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
