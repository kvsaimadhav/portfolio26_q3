import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

interface SkillItem {
  name: string;
  proficiency: number; // 0-100
  icon?: string;
  category?: string;
}

interface SkillGroup {
  name: string;
  icon: string;
  color: string;
  level: number;
  items: SkillItem[];
  description?: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
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
          stagger(80, [
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
export class SkillsComponent implements OnInit {
  selectedSkillGroup: SkillGroup | null = null;
  hoveredSkillIndex: number | null = null;

  skills: SkillGroup[] = [
    {
      name: 'Cloud & Infrastructure',
      icon: '☁️',
      color: '#38bdf8',
      level: 90,
      description: 'Enterprise-grade cloud solutions and DevOps practices',
      items: [
        { name: 'AWS EC2', proficiency: 92, icon: '🖥️' },
        { name: 'AWS S3', proficiency: 90, icon: '💾' },
        { name: 'IAM & Security', proficiency: 88, icon: '🔐' },
        { name: 'Lambda', proficiency: 85, icon: '⚡' },
        { name: 'CloudFront CDN', proficiency: 87, icon: '🌐' },
        { name: 'RDS', proficiency: 89, icon: '🗄️' }
      ]
    },
    {
      name: 'Database Management',
      icon: '🗄️',
      color: '#ec4899',
      level: 85,
      description: 'Advanced database design and optimization',
      items: [
        { name: 'Oracle DB', proficiency: 88, icon: '🔵' },
        { name: 'PL/SQL', proficiency: 87, icon: '📝' },
        { name: 'Performance Tuning', proficiency: 85, icon: '⚙️' },
        { name: 'Backup & Recovery', proficiency: 86, icon: '💿' },
        { name: 'Query Optimization', proficiency: 84, icon: '🔍' }
      ]
    },
    {
      name: 'Backend Development',
      icon: '⚙️',
      color: '#6366f1',
      level: 88,
      description: 'Robust server-side and enterprise frameworks',
      items: [
        { name: 'Java', proficiency: 90, icon: '☕' },
        { name: 'Spring Boot', proficiency: 87, icon: '🍃' },
        { name: 'Hibernate ORM', proficiency: 85, icon: '🔗' },
        { name: 'JSP & Servlets', proficiency: 86, icon: '🌍' },
        { name: 'Struts Framework', proficiency: 82, icon: '📦' },
        { name: 'REST APIs', proficiency: 89, icon: '🔌' }
      ]
    },
    {
      name: 'Programming Languages',
      icon: '💻',
      color: '#f59e0b',
      level: 82,
      description: 'Multi-language proficiency across domains',
      items: [
        { name: 'TypeScript', proficiency: 85, icon: '📘' },
        { name: 'JavaScript', proficiency: 87, icon: '⚡' },
        { name: 'Python', proficiency: 80, icon: '🐍' },
        { name: 'C++', proficiency: 78, icon: '⚔️' },
        { name: 'Angular', proficiency: 88, icon: '🔺' }
      ]
    },
    {
      name: 'DevOps & CI/CD',
      icon: '🚀',
      color: '#10b981',
      level: 80,
      description: 'Modern deployment and automation practices',
      items: [
        { name: 'Docker', proficiency: 82, icon: '🐳' },
        { name: 'Kubernetes', proficiency: 78, icon: '☸️' },
        { name: 'GitHub Actions', proficiency: 84, icon: '🔄' },
        { name: 'Jenkins', proficiency: 80, icon: '🔧' },
        { name: 'Git & Version Control', proficiency: 90, icon: '📂' }
      ]
    },
    {
      name: 'Agile & Leadership',
      icon: '👥',
      color: '#8b5cf6',
      level: 85,
      description: 'Team leadership and methodology expertise',
      items: [
        { name: 'Scrum Master', proficiency: 85, icon: '🎯' },
        { name: 'Agile Practices', proficiency: 87, icon: '📊' },
        { name: 'Team Leadership', proficiency: 86, icon: '👔' },
        { name: 'Project Management', proficiency: 84, icon: '📋' },
        { name: 'Mentoring', proficiency: 85, icon: '🎓' }
      ]
    }
  ];

  ngOnInit(): void {
    // Set first skill group as selected by default
    this.selectedSkillGroup = this.skills[0];
  }

  /**
   * Select a skill group
   */
  selectSkillGroup(skillGroup: SkillGroup): void {
    this.selectedSkillGroup = skillGroup;
  }

  /**
   * Get skills proficiency level label
   */
  getProficiencyLabel(proficiency: number): string {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 80) return 'Advanced';
    if (proficiency >= 70) return 'Proficient';
    if (proficiency >= 60) return 'Intermediate';
    return 'Beginner';
  }

  /**
   * Get proficiency color
   */
  getProficiencyColor(proficiency: number): string {
    if (proficiency >= 90) return '#10b981'; // Green
    if (proficiency >= 80) return '#38bdf8'; // Cyan
    if (proficiency >= 70) return '#6366f1'; // Indigo
    if (proficiency >= 60) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  }

  /**
   * Get average proficiency from all items
   */
  getGroupAverageProficiency(group: SkillGroup): number {
    if (!group.items || group.items.length === 0) return 0;
    const sum = group.items.reduce((acc, item) => acc + item.proficiency, 0);
    return Math.round(sum / group.items.length);
  }

  /**
   * Get total skills count
   */
  getTotalSkillsCount(): number {
    return this.skills.reduce((acc, group) => acc + group.items.length, 0);
  }

  /**
   * Get proficiency distribution
   */
  getProficiencyDistribution(): {
    expert: number;
    advanced: number;
    proficient: number;
  } {
    const all = this.skills.flatMap(g => g.items);
    return {
      expert: all.filter(s => s.proficiency >= 90).length,
      advanced: all.filter(s => s.proficiency >= 80 && s.proficiency < 90).length,
      proficient: all.filter(s => s.proficiency >= 70 && s.proficiency < 80).length
    };
  }

  /**
   * Get top skills
   */
  getTopSkills(): SkillItem[] {
    return this.skills
      .flatMap(g => g.items)
      .sort((a, b) => b.proficiency - a.proficiency)
      .slice(0, 5);
  }
}
