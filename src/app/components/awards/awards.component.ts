import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { Subject } from 'rxjs';

interface Award {
  title: string;
  organization: string;
  year: number;
  description: string;
  category: 'academic' | 'sports' | 'scholarship' | 'technical';
  icon: string;
  badge: string;
}

interface AwardCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms 100ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerContainer', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-40px)' }),
        animate('600ms 150ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('500ms 200ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class AwardsComponent implements OnInit, OnDestroy {
  activeCategory = 'all';
  isDark = true;
  private destroy$ = new Subject<void>();

  // Award categories
  categories: AwardCategory[] = [
    { id: 'all', name: 'All Achievements', icon: '🏆', color: '#f59e0b' },
    { id: 'technical', name: 'Technical', icon: '💻', color: '#6366f1' },
    { id: 'academic', name: 'Academic', icon: '📚', color: '#38bdf8' },
    { id: 'sports', name: 'Sports', icon: '🏅', color: '#10b981' },
    { id: 'scholarship', name: 'Scholarships', icon: '🎓', color: '#ec4899' }
  ];

  // Awards data
  awards: Award[] = [
    {
      title: 'Excellence in Software Development',
      organization: 'Tech Community India',
      year: 2022,
      description: 'Recognized for outstanding contributions to cloud architecture and backend development within the tech community.',
      category: 'technical',
      icon: '🚀',
      badge: 'Recognition'
    },
    {
      title: 'IT Olympiad Finalist',
      organization: 'College of Engineering Pune - Rotaract Club',
      year: 2017,
      description: 'Finalist among thousands of participants in a national-level IT competition. Demonstrated exceptional problem-solving skills and technical expertise.',
      category: 'technical',
      icon: '💻',
      badge: 'National Level'
    },
    {
      title: 'BOSM Silver Medal',
      organization: 'BITS Pilani, Hyderabad',
      year: 2016,
      description: 'Secured silver medal in Carrom at BOSM inter-college sports fest. Competed against top athletes from across India.',
      category: 'sports',
      icon: '🏅',
      badge: 'Award Winner'
    },
    {
      title: 'Outstanding Student Leader',
      organization: 'University Academic Council',
      year: 2015,
      description: 'Awarded for exceptional leadership qualities and contribution to student development programs.',
      category: 'academic',
      icon: '👨‍🎓',
      badge: 'Leadership'
    },
    {
      title: 'PMSS Awardee',
      organization: 'Kendriya Sainik Board, India',
      year: 2014,
      description: 'Awarded prestigious scholarship for academic excellence and outstanding performance in studies and discipline.',
      category: 'scholarship',
      icon: '🎖️',
      badge: 'Prestigious'
    },
    {
      title: 'INSPIRE Scholarship',
      organization: 'MHRD, Government of India',
      year: 2014,
      description: 'National scholarship recognizing excellence in science education. One of the most competitive scholarships in India.',
      category: 'academic',
      icon: '🎓',
      badge: 'National Award'
    }
  ];

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.setupSEO();
    this.detectTheme();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Setup SEO metadata
   */
  private setupSEO(): void {
    this.title.setTitle('Awards & Achievements – K. V. Sai Madhav');
    this.meta.addTags([
      {
        name: 'description',
        content: 'View awards and achievements of K. V. Sai Madhav - including technical awards, academic scholarships, and sports accolades.'
      },
      {
        property: 'og:title',
        content: 'Awards & Achievements – K. V. Sai Madhav'
      },
      {
        property: 'og:description',
        content: 'Explore prestigious awards and recognitions earned through academic excellence, technical expertise, and sports achievement.'
      }
    ]);
  }

  /**
   * Detect current theme
   */
  private detectTheme(): void {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.isDark = isDark !== false;
  }

  /**
   * Filter awards by category
   */
  getFilteredAwards(): Award[] {
    if (this.activeCategory === 'all') {
      return this.awards;
    }
    return this.awards.filter(award => award.category === this.activeCategory);
  }

  /**
   * Switch active category
   */
  switchCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.trackCategorySwitch(categoryId);
  }

  /**
   * Get category color
   */
  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || '#6366f1';
  }

  /**
   * Get award count by category
   */
  getCountByCategory(categoryId: string): number {
    if (categoryId === 'all') {
      return this.awards.length;
    }
    return this.awards.filter(award => award.category === categoryId).length;
  }

  /**
   * Check if category has awards
   */
  hasCategoryAwards(categoryId: string): boolean {
    return this.getCountByCategory(categoryId) > 0;
  }

  /**
   * Track category switch for analytics
   */
  private trackCategorySwitch(categoryId: string): void {
    try {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'awards_category_switch', {
          category: categoryId,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }
}
