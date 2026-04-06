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

  onSubmit() {
    if (!this.canSubmit) return;

    this.status = 'sending';

    const formData = new FormData();
    formData.append('form-name', 'contact');
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('message', this.message);

    fetch('/', {
      method: 'POST',
      body: formData
    })
      .then(() => {
        this.status = 'success';
        this.name = '';
        this.email = '';
        this.message = '';
      })
      .catch(() => {
        this.status = 'error';
        this.errorMessage = 'Something went wrong. Try again.';
      });
  }
}