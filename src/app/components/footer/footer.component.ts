import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  year = new Date().getFullYear();

  socialLinks = [
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/sai-madhav-761759335/' },
    { name: 'GitHub', icon: 'github', url: 'https://github.com/kvsaimadhav' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/kvsaimadhav' },
    { name: 'Stack Overflow', icon: 'stack-overflow', url: 'https://stackoverflow.com/users/23655247/sai-madhav' },
    { name: 'Email', icon: 'email', url: 'mailto:kvsaimadhav@gmail.com' }
  ];

  legalLinks = [
    { label: 'Privacy', route: '/privacy' },
    { label: 'Terms', route: '/terms' },
    { label: 'Accessibility', route: '/accessibility' }
  ];
}