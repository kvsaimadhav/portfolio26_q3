import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, PROJECTS } from '../../data/projects';

@Component({
  selector: 'app-project',
  standalone: true,               // if using standalone components
  imports: [CommonModule],        // required for *ngFor, *ngIf, etc.
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  activeFilter = 'all';

  categories = [
    { id: 'all', name: 'All', icon: '📁' },
    { id: 'employment', name: 'Employment', icon: '💼' },
    { id: 'github', name: 'GitHub', icon: '🐙' },
    { id: 'academic', name: 'Academic', icon: '🎓' },
    { id: 'masters', name: 'Masters', icon: '📚' }
  ];

  @ViewChild('projectsRoot', { static: true }) projectsRoot!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.projects = PROJECTS;
    this.filterProjects('all');
  }

  get projectCount(): number {
    return this.projects.length;
  }

  get completedCount(): number {
    return this.projects.filter(p => p.status === 'completed').length;
  }

  get inProgressCount(): number {
    return this.projects.filter(p => p.status !== 'completed').length;
  }

  get technologyCount(): number {
    return new Set(this.projects.flatMap(p => p.technologies || [])).size;
  }

  get categoryCount(): number {
    return new Set(this.projects.map(p => p.category)).size;
  }

  /**
   * Filter logic (updates filteredProjects and re-renders)
   */
  filterProjects(filter: string) {
    this.activeFilter = filter;
    if (filter === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(p => p.category === filter);
    }
    this.renderProjectsToDOM();
  }

  /**
   * Render the filteredProjects into the DOM using Renderer2
   * (no *ngFor / ngClass usage)
   */
  renderProjectsToDOM() {
    const container = this.projectsRoot.nativeElement;

    // Clear existing children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // For accessibility: announce count
    this.renderer.setAttribute(container, 'aria-label', `${this.filteredProjects.length} projects listed`);

    // Build each project card
    this.filteredProjects.forEach(project => {
      // article
      const article = this.renderer.createElement('article');
      this.renderer.addClass(article, 'project-card');
      this.renderer.addClass(article, 'card');
      this.renderer.setAttribute(article, 'role', 'listitem');

      // header
      const header = this.renderer.createElement('header');
      this.renderer.addClass(header, 'project-header');

      // category container
      const catDiv = this.renderer.createElement('div');
      this.renderer.addClass(catDiv, 'project-category');

      const iconSpan = this.renderer.createElement('span');
      this.renderer.addClass(iconSpan, 'category-icon');
      this.renderer.appendChild(iconSpan, this.renderer.createText(this.getCategoryIcon(project.category)));

      const labelSpan = this.renderer.createElement('span');
      this.renderer.addClass(labelSpan, 'category-label');
      this.renderer.appendChild(labelSpan, this.renderer.createText(this.getCategoryLabel(project.category)));

      this.renderer.appendChild(catDiv, iconSpan);
      this.renderer.appendChild(catDiv, labelSpan);

      // status span
      const statusSpan = this.renderer.createElement('span');
      this.renderer.addClass(statusSpan, 'project-status');
      if (project.status === 'completed') {
        // programmatically add 'completed' class instead of using [ngClass]
        this.renderer.addClass(statusSpan, 'completed');
        this.renderer.appendChild(statusSpan, this.renderer.createText('✅ Completed'));
      } else {
        this.renderer.appendChild(statusSpan, this.renderer.createText('🔄 In Progress'));
      }

      this.renderer.appendChild(header, catDiv);
      this.renderer.appendChild(header, statusSpan);

      // title
      const h3 = this.renderer.createElement('h3');
      this.renderer.addClass(h3, 'project-title');
      this.renderer.appendChild(h3, this.renderer.createText(project.title));

      // description
      const desc = this.renderer.createElement('p');
      this.renderer.addClass(desc, 'project-description');
      this.renderer.appendChild(desc, this.renderer.createText(project.description));

      // technologies
      const techWrap = this.renderer.createElement('div');
      this.renderer.addClass(techWrap, 'technologies');
      this.renderer.setAttribute(techWrap, 'aria-hidden', 'false');

      (project.technologies || []).forEach(t => {
        const tag = this.renderer.createElement('span');
        this.renderer.addClass(tag, 'tech-tag');
        this.renderer.appendChild(tag, this.renderer.createText(t));
        this.renderer.appendChild(techWrap, tag);
      });

      // details (case study)
      let detailsEl: HTMLElement | null = null;
      if (project.problem || project.solution || project.impact) {
        detailsEl = this.renderer.createElement('details');
        this.renderer.addClass(detailsEl, 'project-details');

        const summary = this.renderer.createElement('summary');
        this.renderer.appendChild(summary, this.renderer.createText('View case study'));
        this.renderer.appendChild(detailsEl, summary);

        const caseDiv = this.renderer.createElement('div');
        this.renderer.addClass(caseDiv, 'case');

        if (project.problem) {
          const hProblem = this.renderer.createElement('h4');
          this.renderer.appendChild(hProblem, this.renderer.createText('Problem'));
          const pProblem = this.renderer.createElement('p');
          this.renderer.appendChild(pProblem, this.renderer.createText(project.problem));
          this.renderer.appendChild(caseDiv, hProblem);
          this.renderer.appendChild(caseDiv, pProblem);
        }
        if (project.solution) {
          const hAction = this.renderer.createElement('h4');
          this.renderer.appendChild(hAction, this.renderer.createText('Action'));
          const pAction = this.renderer.createElement('p');
          this.renderer.appendChild(pAction, this.renderer.createText(project.solution));
          this.renderer.appendChild(caseDiv, hAction);
          this.renderer.appendChild(caseDiv, pAction);
        }
        if (project.impact) {
          const hImpact = this.renderer.createElement('h4');
          this.renderer.appendChild(hImpact, this.renderer.createText('Impact'));
          const pImpact = this.renderer.createElement('p');
          this.renderer.appendChild(pImpact, this.renderer.createText(project.impact));
          this.renderer.appendChild(caseDiv, hImpact);
          this.renderer.appendChild(caseDiv, pImpact);
        }

        this.renderer.appendChild(detailsEl, caseDiv);
      }

      // links
      const linksDiv = this.renderer.createElement('div');
      this.renderer.addClass(linksDiv, 'project-links');

      if (project.githubUrl) {
        const aGithub = this.renderer.createElement('a');
        this.renderer.addClass(aGithub, 'project-link');
        this.renderer.setAttribute(aGithub, 'href', project.githubUrl);
        this.renderer.setAttribute(aGithub, 'target', '_blank');
        this.renderer.setAttribute(aGithub, 'rel', 'noopener');
        this.renderer.appendChild(aGithub, this.renderer.createText('📂 GitHub'));
        this.renderer.appendChild(linksDiv, aGithub);
      }
      if (project.liveUrl) {
        const aLive = this.renderer.createElement('a');
        this.renderer.addClass(aLive, 'project-link');
        this.renderer.setAttribute(aLive, 'href', project.liveUrl);
        this.renderer.setAttribute(aLive, 'target', '_blank');
        this.renderer.setAttribute(aLive, 'rel', 'noopener');
        this.renderer.appendChild(aLive, this.renderer.createText('🌐 Live Demo'));
        this.renderer.appendChild(linksDiv, aLive);
      }

      // assemble the card
      this.renderer.appendChild(article, header);
      this.renderer.appendChild(article, h3);
      this.renderer.appendChild(article, desc);
      this.renderer.appendChild(article, techWrap);
      if (detailsEl) this.renderer.appendChild(article, detailsEl);
      this.renderer.appendChild(article, linksDiv);

      // append to container
      this.renderer.appendChild(container, article);
    });
  }

  // Helper methods used by template interpolations (stats)
  getCompletedCount(): number {
    return this.projects.filter(p => p.status === 'completed').length;
  }

  getTechnologiesCount(): number {
    const set = new Set<string>();
    this.projects.forEach(p => (p.technologies || []).forEach(t => set.add(t)));
    return set.size;
  }

  getCategoriesCount(): number {
    return new Set(this.projects.map(p => p.category)).size;
  }

  // Small helpers used both here and by programmatic rendering
  getCategoryIcon(cat: string): string {
    return ({ employment: '💼', github: '🐙', academic: '🏫', masters: '📚' } as any)[cat] ?? '📂';
  }

  getCategoryLabel(cat: string): string {
    return ({ employment: 'Employment', github: 'GitHub', academic: 'Academic', masters: 'Masters' } as any)[cat] ?? 'Other';
  }
}
