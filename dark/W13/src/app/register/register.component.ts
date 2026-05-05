import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  template: `
    <section>
      <h2>Register</h2>
      <form (ngSubmit)="submit()">
        <div>
          <label for="name">Name</label>
          <input id="name" name="name" [(ngModel)]="name" />
        </div>
        <div>
          <label for="email">Email</label>
          <input id="email" name="email" [(ngModel)]="email" type="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            [(ngModel)]="password"
            type="password"
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <p class="error" *ngIf="error">{{ error }}</p>
      <p><a routerLink="/login">Go to login</a></p>
    </section>
  `
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    const name = this.name.trim();
    const email = this.email.trim();

    if (!name || !email || !this.password) {
      this.error = 'All fields are required.';
      return;
    }

    this.auth.register({ name, email, password: this.password });
    this.router.navigateByUrl('/login');
  }
}
