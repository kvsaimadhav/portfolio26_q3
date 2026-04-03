import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { routeAnimations } from './animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AwardsComponent } from './components/awards/awards.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollAnimationService } from './services/scroll-animation.service';
import { EducationComponent } from './components/education/education.component';
import { ProjectComponent } from './components/project/project.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    EducationComponent,
    ProjectComponent,
    ExperienceComponent,
    SkillsComponent,
    AwardsComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Sai Portfolio';

  constructor(
    private contexts: ChildrenOutletContexts,
    private scrollAnimationService: ScrollAnimationService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.registerSvgIcons(iconRegistry, sanitizer);
  }

  ngOnInit(): void {
    this.initializeScrollAnimations();
  }

  ngOnDestroy(): void {
    this.scrollAnimationService.destroy();
  }

  /**
   * Register SVG icons for the application
   */
  private registerSvgIcons(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ): void {
    const icons = [
      'linkedin',
      'github',
      'twitter',
      'stack-overflow',
      'email'
    ];

    icons.forEach(iconName => {
      iconRegistry.addSvgIcon(
        iconName,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${iconName}.svg`)
      );
    });
  }

  /**
   * Initialize scroll animations after DOM is ready
   */
  private initializeScrollAnimations(): void {
    setTimeout(() => {
      this.scrollAnimationService.init();
    }, 500); // Reduced from 1000ms for better UX
  }

  /**
   * Get route animation data for route transitions
   */
  getRouteAnimationData(): string | undefined {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
