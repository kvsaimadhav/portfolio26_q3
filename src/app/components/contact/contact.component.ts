import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  status: 'idle' | 'success' | 'error' | 'sending' = 'idle';
  errorMessage = '';

  get canSubmit(): boolean {
    return (
      this.name.trim().length > 2 &&
      /\S+@\S+\.\S+/.test(this.email) &&
      this.message.trim().length > 10
    );
  }

  onSubmit(): void {
    if (!this.canSubmit) {
      this.errorMessage = 'Complete all fields with valid values.';
      this.status = 'error';
      return;
    }
    this.status = 'sending';
    this.errorMessage = '';
    setTimeout(() => {
      this.status = 'success';
      this.name = '';
      this.email = '';
      this.message = '';
    }, 1200);
  }
}
