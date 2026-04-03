import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

interface Experience {
  company: string;
  position: string;
  period: string;
  duration?: string;
  description: string[];
  current?: boolean;
  icon: string;
  color: string;
  tags: string[];
  achievements?: string[];
  startYear?: number;
  endYear?: number;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms 100ms cubic-bezier(0.34, 1.56, 0.64, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerCards', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms cubic-bezier(0.34, 1.56, 0.64, 1)', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-40px)' }),
        animate('600ms 150ms cubic-bezier(0.34, 1.56, 0.64, 1)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [
    {
      company: 'Ekluvya',
      position: 'Senior Software Developer',
      period: 'Dec 2024 – Present',
      duration: '1 year 6 months',
      icon: '🚀',
      color: '#38bdf8',
      current: true,
      tags: ['Team Leadership', 'AWS', 'CI/CD', 'System Design', 'DevOps'],
      achievements: ['15-member team lead', '30% deployment efficiency gain', 'Multi-product delivery'],
      description: [
        'Leading a 15-member engineering team across complete SDLC with mentoring and technical guidance',
        'AWS system administration with focus on security, scalability and cost optimization',
        'Delivered multiple in-house product initiatives under tight deadlines with cross-functional collaboration',
        'Introduced CI/CD automation improving deployment efficiency by ~30% using GitHub Actions and Jenkins'
      ]
    },
    {
      company: 'Neemus Software Solutions',
      position: 'Software Engineer',
      period: 'Aug 2023 – Sep 2024',
      duration: '1+ year',
      icon: '🛡️',
      color: '#ec4899',
      tags: ['Defense Projects', 'Team Leadership', 'Compliance'],
      achievements: ['2 key projects delivered', 'Defense-grade standards', 'Mentor appreciation'],
      description: [
        'Worked on defense projects for LRDE and ADA with classified security protocols',
        'Led a 4-member team ensuring strict adherence to defense-grade standards and regulations',
        'Delivered two key projects with formal mentor appreciation and recognition',
        'Implemented comprehensive documentation and knowledge transfer for mission-critical systems'
      ]
    },
    {
      company: 'DRDO – DRDL',
      position: 'Server Engineer',
      period: 'Aug 2022 – Aug 2023',
      duration: '1+ year',
      icon: '🔧',
      color: '#f59e0b',
      tags: ['Oracle DB', 'Java/JSP', 'Mentoring', 'Legacy System', 'Database Admin'],
      achievements: ['Mission-critical systems', 'Legacy modernization', 'Team mentoring'],
      description: [
        'Maintained Oracle databases supporting mission-critical systems with 99.9% uptime SLA',
        'Modernized legacy UI architecture using Java/JSP with improved user experience',
        'Mentored junior engineers and trained apprentices for knowledge transfer continuity',
        'Implemented database optimization techniques improving query performance by 40%'
      ]
    },
        {
      company: 'Strategic Solutions Group LLC',
      position: 'Jr. Full Stack Software Engineer',
      period: 'Oct 2021 – Feb 2022',
      duration: '4 months',
      icon: '💼',
      color: '#6366f1',
      tags: ['Java/JSP', 'Servlets', 'Struts', 'AWS Workspace', 'Maven'],
      achievements: ['MAVEN project delivery', 'Full-stack development', 'AWS integration'],
      description: [
        'Developed end-to-end web applications using Java/JSP with Apache Struts MVC framework',
        'Built MAVEN-based project with robust server-side Servlet architecture and dynamic JSP templates',
        'Integrated AWS Workspace for secure cloud-based development environment and team collaboration',
        'Optimized application performance and implemented best practices for enterprise-grade solutions'
      ]
    }
  ];

  get totalExperience(): number {
    let durationInYears = 0;
    // Rough calculation from 2021 to 2024
    return 3.5;
  }

  get currentCompany(): Experience | null {
    return this.experiences.find(exp => exp.current) || null;
  }

  get companiesCount(): number {
    return this.experiences.length;
  }

  ngOnInit(): void {
    // Initialize component
  }

  /**
   * Get years of experience at company
   */
  getYearsAtCompany(experience: Experience): string {
    const start = experience.startYear || 2021;
    const end = experience.endYear || new Date().getFullYear();
    const years = end - start;
    
    if (years < 1) return '< 1 year';
    if (years === 1) return '1 year';
    return `${years}+ years`;
  }

  /**
   * Get role level badge
   */
  getRoleLevel(position: string): string {
    if (position.toLowerCase().includes('senior')) return 'Senior';
    if (position.toLowerCase().includes('lead')) return 'Lead';
    if (position.toLowerCase().includes('jr')) return 'Junior';
    if (position.toLowerCase().includes('engineer')) return 'Mid-Level';
    return 'Professional';
  }

  /**
   * Get icon based on company
   */
  getCompanyIcon(company: string): string {
    const icons: { [key: string]: string } = {
      'Ekluvya': '🚀',
      'Neemus Software Solutions': '🛡️',
      'Strategic Solutions Group LLC': '💼',
      'DRDO – DRDL': '🔧'
    };
    return icons[company] || '💼';
  }

  /**
   * Get trending skills from all experiences
   */
  getTrendingSkills(): string[] {
    const allTags = this.experiences.flatMap(exp => exp.tags);
    const skillCount = new Map<string, number>();
    
    allTags.forEach(tag => {
      skillCount.set(tag, (skillCount.get(tag) || 0) + 1);
    });

    return Array.from(skillCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([skill]) => skill);
  }

  /**
   * Get experience summary stats
   */
  getExperienceSummary(): { 
    totalYears: string; 
    companies: number; 
    projects: number; 
    teamSize: number 
  } {
    return {
      totalYears: '3.5+',
      companies: this.companiesCount,
      projects: 8,
      teamSize: 20
    };
  }
}
