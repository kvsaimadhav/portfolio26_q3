export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'employment' | 'github' | 'academic' | 'masters';
  status: 'completed' | 'in-progress';
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  year?: number;
}

export const PROJECTS: Project[] = [
  {
    id: 'ekluvya-ott',
    title: 'Ekluvya — OTT / Video Learning Platform',
    description:
      'End-to-end frontend and cloud work on a video learning product — player integrations, CDN, transcode pipelines and CI/CD.',
    category: 'employment',
    status: 'completed',
    technologies: ['Angular', 'TypeScript', 'AWS', 'FFmpeg', 'HLS', 'CDN', 'Docker'],
    problem:
      'Need a reliable streaming experience and repeatable deployments for a growing educational platform.',
    solution:
      'Implemented HLS-friendly player, automated server-side transcoding using FFmpeg, integrated CDN + S3 storage, and added CI/CD pipelines with rollback support.',
    impact:
      'Reduced buffering incidents by 30% and decreased deployment time from 45 to 10 minutes. (Telemetry & logs available on request)',
    year: 2024
  },
  {
    id: 'oracle-maintenance',
    title: 'Oracle DB Maintenance (DRDL/DRDO)',
    description:
      'Database & server maintenance for defense projects — backups, script automation and legacy connectivity.',
    category: 'employment',
    status: 'completed',
    technologies: ['OracleDB', 'Linux', 'Shell', 'Backup/Restore'],
    problem: 'Legacy backups were manual and error-prone, risking availability.',
    solution: 'Automated backup scheduling, validation and restore playbooks; implemented monitoring alerts for DB health.',
    impact: 'Increased RTO confidence and eliminated manual backup drift.',
    year: 2022
  },
  {
    id: 'angular-portfolio',
    title: 'Angular Portfolio (This Site)',
    description:
      'Personal portfolio built with Angular (TypeScript) displaying projects and case studies with a focus on clarity and recruiter-readiness.',
    category: 'github',
    status: 'in-progress',
    technologies: ['Angular', 'TypeScript', 'Netlify', 'Lighthouse'],
    githubUrl: 'https://github.com/kvsaimadhav/portfolio26',
    problem: 'Need a single place to present projects and make contacting easy.',
    solution: 'Created an accessible SPA with downloadable resume and contact form.',
    impact: 'Improves outreach and provides a consistent place to link in applications.',
    year: 2025
  },
  {
    id: 'masters-ddos',
    title: 'Client-Puzzle Anti-DDoS (Masters Research)',
    description: 'Research prototype that integrated client-puzzles and economic disincentives for attackers.',
    category: 'masters',
    status: 'completed',
    technologies: ['Python', 'Django', 'Jupyter', 'Data Science'],
    problem: 'Mitigating automated attack traffic while preserving UX for legitimate users.',
    solution:
      'Designed client puzzles + proof-of-work proof points; built analytics for attacker deterrence modeling.',
    impact: 'Produced reproducible notebooks and a demo application used in thesis.',
    year: 2019
  },
  {
    id: 'web-scrape',
    title: 'Web Scraping & Data Cleaning (Academic)',
    description: 'Multiple scraping projects collecting product lists for analysis using Selenium/BeautifulSoup.',
    category: 'academic',
    status: 'completed',
    technologies: ['Python', 'Selenium', 'BeautifulSoup'],
    impact: 'Provided structured datasets for academic analysis and learning.',
    year: 2018
  }
];
