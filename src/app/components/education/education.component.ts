import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

interface Education {
  degree: string;
  institution: string;
  duration: string;
  score: string;
  scoreNumeric?: number;
  scoreMax?: number;
  description: string;
  icon: string;
  level: 'masters' | 'bachelors' | 'intermediate' | 'secondary';
  color: string;
  achievements?: string[];
}

@Component({
  selector: 'app-education',
  standalone: true,
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  imports: [CommonModule],
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
          stagger(120, [
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
export class EducationComponent implements OnInit {
  animateGpa = true;

  educationList: Education[] = [
    {
      degree: 'Master of Science',
      institution: 'Central Michigan University',
      duration: '2020 – 2021',
      score: '3.93 / 4.0',
      scoreNumeric: 3.93,
      scoreMax: 4.0,
      description:
        'Computer Science with specialization in Cloud Computing and Distributed Systems. Advanced coursework in microservices architecture and containerization.',
      icon: '🎓',
      level: 'masters',
      color: '#38bdf8',
      achievements: ['Dean\'s List', 'Cloud Computing Specialization', 'Distinction']
    },
    {
      degree: 'Bachelor of Technology',
      institution: 'BITS Pilani, Hyderabad',
      duration: '2014 – 2018',
      score: '7.71 / 10.0',
      scoreNumeric: 7.71,
      scoreMax: 10.0,
      description:
        'Electronics & Communication Engineering with strong foundation in software development, algorithms, and system design.',
      icon: '🏫',
      level: 'bachelors',
      color: '#6366f1',
      achievements: ['Merit Scholar', 'Top 10%', 'Research Thesis']
    },
    {
      degree: 'Intermediate (XII)',
      institution: 'SR Educational Center',
      duration: '2012 – 2014',
      score: '97.8%',
      scoreNumeric: 97.8,
      scoreMax: 100,
      description:
        'Mathematics, Physics, Chemistry with Computer Science. Achieved state-level merit recognition.',
      icon: '📚',
      level: 'intermediate',
      color: '#ec4899',
      achievements: ['State Merit', '98% Average', 'Science Excellence']
    },
    {
      degree: 'Secondary (X)',
      institution: 'Warangal Public School',
      duration: '2011 – 2012',
      score: '95.0%',
      scoreNumeric: 95.0,
      scoreMax: 100,
      description:
        'Secondary education with distinction in Mathematics and Science. Foundation for technical excellence.',
      icon: '📖',
      level: 'secondary',
      color: '#f59e0b',
      achievements: ['Distinction', '95% Average', 'Merit Certificate']
    }
  ];

  ngOnInit(): void {
    // Parse and validate scores on init
    this.educationList.forEach(edu => {
      this.parseScore(edu);
    });

    // Run GPA highlight animation only once
    setTimeout(() => (this.animateGpa = false), 1400);
  }

  /**
   * Parse score string and extract numeric values
   */
  parseScore(edu: Education): void {
    const scoreStr = edu.score.trim();

    // Format: "3.93 / 4.0"
    if (scoreStr.includes('/')) {
      const parts = scoreStr.split('/').map(s => parseFloat(s.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        edu.scoreNumeric = parts[0];
        edu.scoreMax = parts[1];
        return;
      }
    }

    // Format: "97.8%" or "95%"
    if (scoreStr.includes('%')) {
      const numericValue = parseFloat(scoreStr.replace('%', ''));
      if (!isNaN(numericValue)) {
        edu.scoreNumeric = numericValue;
        edu.scoreMax = 100;
        return;
      }
    }

    // Fallback
    edu.scoreNumeric = 0;
    edu.scoreMax = 100;
  }

  /**
   * Calculate progress bar width (0-100%)
   */
  getProgressWidth(score: string): number {
    const edu = this.educationList.find(e => e.score === score);
    if (edu && edu.scoreNumeric && edu.scoreMax) {
      return (edu.scoreNumeric / edu.scoreMax) * 100;
    }

    // Fallback calculation
    const value = parseFloat(score.replace(/[^\d.]/g, ''));
    if (score.includes('%')) return value;
    if (score.includes('/')) {
      const parts = score.split('/');
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (!isNaN(numerator) && !isNaN(denominator)) {
        return (numerator / denominator) * 100;
      }
    }
    return 85;
  }

  /**
   * Get score rating (Excellent, Very Good, Good, etc.)
   */
  getScoreRating(score: string): string {
    const progress = this.getProgressWidth(score);
    
    if (progress >= 95) return 'Excellent';
    if (progress >= 85) return 'Very Good';
    if (progress >= 75) return 'Good';
    if (progress >= 65) return 'Satisfactory';
    return 'Average';
  }

  /**
   * Get score color based on rating
   */
  getScoreColor(score: string): string {
    const progress = this.getProgressWidth(score);
    
    if (progress >= 95) return '#10b981'; // Green
    if (progress >= 85) return '#38bdf8'; // Cyan
    if (progress >= 75) return '#6366f1'; // Indigo
    if (progress >= 65) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  }

  /**
   * Get education level display name
   */
  getEducationLevel(level: string): string {
    const levels: { [key: string]: string } = {
      masters: 'Advanced',
      bachelors: 'Undergraduate',
      intermediate: 'Pre-University',
      secondary: 'Foundation'
    };
    return levels[level] || 'Education';
  }

  /**
   * Get ranking badge emoji based on score
   */
  getScoreBadge(score: string): string {
    const progress = this.getProgressWidth(score);
    
    if (progress >= 95) return '🏆';
    if (progress >= 85) return '⭐';
    if (progress >= 75) return '✨';
    return '📌';
  }

  /**
   * Calculate average GPA from all degrees
   */
  getAverageGPA(): number {
    const validScores = this.educationList
      .filter(edu => edu.scoreNumeric && edu.scoreMax)
      .map(edu => (edu.scoreNumeric! / edu.scoreMax!) * 4.0); // Normalize to 4.0 scale

    if (validScores.length === 0) return 0;
    return validScores.reduce((a, b) => a + b, 0) / validScores.length;
  }

  /**
   * Get highest score education
   */
  getHighestScore(): Education | null {
    if (this.educationList.length === 0) return null;
    
    return this.educationList.reduce((prev, current) => {
      const prevProgress = this.getProgressWidth(prev.score);
      const currentProgress = this.getProgressWidth(current.score);
      return currentProgress > prevProgress ? current : prev;
    });
  }

  /**
   * Get lowest score education
   */
  getLowestScore(): Education | null {
    if (this.educationList.length === 0) return null;
    
    return this.educationList.reduce((prev, current) => {
      const prevProgress = this.getProgressWidth(prev.score);
      const currentProgress = this.getProgressWidth(current.score);
      return currentProgress < prevProgress ? current : prev;
    });
  }
}
