import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  year = new Date().getFullYear();

  showScrollTop = false;

  email = '';
  subscribed = false;

  isOnline = true;

  theme: 'dark' | 'light' = 'dark';

  socialLinks = [
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/sai-madhav-761759335/' },
    { name: 'GitHub', icon: 'github', url: 'https://github.com/kvsaimadhav' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/kvsaimadhav' },
    { name: 'Stack Overflow', icon: 'stack-overflow', url: 'https://stackoverflow.com/users/23655247/sai-madhav' },
    { name: 'Email', icon: 'email', url: 'mailto:kvsaimadhav@gmail.com' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.showScrollTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  subscribe() {
    if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) return;
    this.subscribed = true;
    this.email = '';
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
  }
}