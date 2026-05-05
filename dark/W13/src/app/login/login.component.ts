import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  template: `
    <section>
      <h2>Login</h2>
      <form (ngSubmit)="submit()">
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
        <button type="submit">Login</button>
      </form>
      <p class="error" *ngIf="error">{{ error }}</p>
      <p><a routerLink="/register">Register</a></p>
    </section>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    const email = this.email.trim();

    if (!email || !this.password) {
      this.error = 'Email and password are required.';
      return;
    }

    const ok = this.auth.login(email, this.password);
    if (ok) {
      this.error = '';
      this.router.navigateByUrl('/profile');
    } else {
      this.error = 'Invalid credentials.';
    }
  }
}
