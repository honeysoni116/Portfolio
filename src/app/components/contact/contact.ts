import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name = signal('');
  email = signal('');
  message = signal('');

  isNameValid = computed(() => this.name().trim().length > 0);
  isEmailValid = computed(() => {
    const email = this.email().trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  });
  isMessageValid = computed(() => this.message().trim().length > 0);

  isValid = computed(() => 
    this.isNameValid() && this.isEmailValid() && this.isMessageValid()
  );

  onSubmit() {
    if (this.isValid()) {
      console.log({
        name: this.name(),
        email: this.email(),
        message: this.message()
      });
      alert('Message sent!');
      this.name.set('');
      this.email.set('');
      this.message.set('');
    }
  }
}
